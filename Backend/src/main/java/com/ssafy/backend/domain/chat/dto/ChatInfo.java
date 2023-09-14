package com.ssafy.backend.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatInfo {
    private Long userId;
    private Long chatRoomId;
    private String content;
    private Long chatNumber;
}
