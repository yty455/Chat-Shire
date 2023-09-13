package com.ssafy.backend.domain.chat.dto;

public class ChatResponse {
    private String name;
    private String content;

    public ChatResponse(ChatPost chatPost){
        this.content = chatPost.getContent();
    }
}
