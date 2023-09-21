package com.ssafy.backend.domain.chat.dto;

import lombok.Getter;

@Getter
public class ChatRoomUserInfoResponse {
    private Long userId;
    private String nickname;
    private String profileImage;
    private String profileColor;

    public ChatRoomUserInfoResponse(Long userId, String nickname, String profileImage, String profileColor){
        this.userId = userId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.profileColor = profileColor;
    }
}
