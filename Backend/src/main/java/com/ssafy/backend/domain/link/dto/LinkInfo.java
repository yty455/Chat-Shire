package com.ssafy.backend.domain.link.dto;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.link.Link;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LinkInfo {
    private String content;

    public Link toEntity(LinkInfo linkInfo, Long userId, ChatRoom chatRoom) {
        return Link.builder()
                .content(linkInfo.getContent())
                .userId(userId)
                .chatRoom(chatRoom).build();
    }
}
