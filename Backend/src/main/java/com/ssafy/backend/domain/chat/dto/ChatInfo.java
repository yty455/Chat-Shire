package com.ssafy.backend.domain.chat.dto;

import com.ssafy.backend.domain.chat.Chat;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.user.User;
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

    public Chat toEntity(User user, ChatRoom chatRoom){
        return Chat.builder()
                .user(user)
                .chatRoom(chatRoom)
                .content(this.content)
                .chatNumber(this.chatNumber).build();
    }
}
