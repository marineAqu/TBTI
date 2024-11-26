    package com.kibwa.tbti;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.MediaType;
    import org.springframework.stereotype.Service;
    import org.springframework.web.reactive.function.client.WebClient;
    import reactor.core.publisher.Mono;

    @Service
    public class ChatService {

        private final WebClient webClient;

        @Autowired
        public ChatService(WebClient.Builder webClientBuilder) {
            this.webClient = WebClient.builder()
                    .baseUrl("http://localhost:8001/")
//                    .baseUrl("http://172.20.10.13:8001/")  // FastAPI 서버의 URL
                    .build();
        }

        // AI로 메시지 전송 (uid, tbtiType, userMessage)
        public String sendMessageToAI(String userId, String tbtiType, String userMessage) {
            // 로그로 확인
            System.out.println("Received in AI - userId: " + userId + ", tbtiType: " + tbtiType + ", userMessage: " + userMessage);

            // 요청 보낼 데이터 생성
            ChatRequest request = new ChatRequest(userId, tbtiType, userMessage);

            try {
                // FastAPI 서버로 요청
                Mono<String> responseMono = webClient.post()
                        .uri("/ask-ai/")  // FastAPI 서버의 경로
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(String.class);

                // 응답 처리
                return responseMono.block();
            } catch (Exception e) {
                return "FastAPI 서버와 연결할 수 없습니다.";
            }
        }

        // ChatRequest 클래스
        public static class ChatRequest {
            private String userId;
            private String tbtiType;
            private String userMessage;

            // 생성자
            public ChatRequest(String userId, String tbtiType, String userMessage) {
                this.userId = userId;
                this.tbtiType = tbtiType;
                this.userMessage = userMessage;
            }

            // Getter, Setter
            public String getUserId() {
                return userId;
            }

            public void setUserId(String userId) {
                this.userId = userId;
            }

            public String getTbtiType() {
                return tbtiType;
            }

            public void setTbtiType(String tbtiType) {
                this.tbtiType = tbtiType;
            }

            public String getUserMessage() {
                return userMessage;
            }

            public void setUserMessage(String userMessage) {
                this.userMessage = userMessage;
            }
        }
    }




