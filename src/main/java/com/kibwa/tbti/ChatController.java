package com.kibwa.tbti;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/message")
    public ResponseEntity<String> sendMessage(@RequestBody ChatMessage chatMessage) {
        try {
            // 로그로 확인
            System.out.println("Received message - userId: " + chatMessage.getUserId() +
                    ", tbtiType: " + chatMessage.getTbtiType() +
                    ", message: " + chatMessage.getMessage());

            // 사용자 ID, TBTI 유형, 메시지를 AI로 전달
            String response = chatService.sendMessageToAI(
                    chatMessage.getUserId(),
                    chatMessage.getTbtiType(),
                    chatMessage.getMessage());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while communicating with the AI server.");
        }
    }
}



