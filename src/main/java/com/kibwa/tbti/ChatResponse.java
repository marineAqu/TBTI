package com.kibwa.tbti;

public class ChatResponse {
    private String response;

    // 기본 생성자
    //public ChatResponse() {}

    // 파라미터가 있는 생성자
    public ChatResponse(String response) {
        this.response = response;
    }

    // Getter 및 Setter
    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
