package com.ssafy.backend.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ChatPost {
    private Long chatRoomId;
    private String content;
    private List<String> files;
    private List<String> thumbnails;
}
