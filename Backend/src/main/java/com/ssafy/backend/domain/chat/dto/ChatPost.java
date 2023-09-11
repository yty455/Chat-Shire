package com.ssafy.backend.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ChatPost {
    private Long chatRoomId;
    private String content;

}
