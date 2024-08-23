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
        this.webClient = webClientBuilder.baseUrl("http://localhost:8001").build(); // FastAPI 서버의 URL 설정
    }

    public String sendMessageToAI(String userMessage) {
        // 요청 보낼 데이터 생성
        ChatRequest request = new ChatRequest(userMessage);

        try {
            // FastAPI 서버로 요청
            Mono<ChatResponse> responseMono = webClient.post()
                    .uri("/ask-ai/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(ChatResponse.class);

            // 응답을 동기적으로 기다리고 반환
            ChatResponse response = responseMono.block();
            return response.getResponse();
        } catch (Exception e) {
            e.printStackTrace();
            return "FastAPI 서버와 연결할 수 없습니다.";
        }
    }

    // ChatRequest 클래스
    public static class ChatRequest {
        private String question;

        public ChatRequest(String question) {
            this.question = question;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }
    }

    // ChatResponse 클래스
    public static class ChatResponse {
        private String response;

        public String getResponse() {
            return response;
        }

        public void setResponse(String response) {
            this.response = response;
        }
    }
}
