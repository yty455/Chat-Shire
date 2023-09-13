package com.ssafy.backend.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ChatInfo {
    private Long userId;
    private Long chatRoomId;
    private String content;
    private Long chatNumber;
}
