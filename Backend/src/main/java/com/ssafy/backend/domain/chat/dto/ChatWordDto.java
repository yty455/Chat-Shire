package com.ssafy.backend.domain.chat.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatWordDto {
    private Long chatroomId;
    private Long userId;
    private List<String> categoryList;

}
