package com.ssafy.backend.domain.user.dto;

import com.ssafy.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class UserInfoResponse {

    private String socialId;
    private String githubId;
    private String nickname;
    private String profileImage;
    private String profileColor;
    private String introduction;
    private String detailIntroduction;

    public static UserInfoResponse fromEntity(User user){
        return UserInfoResponse.builder()
                .socialId(user.getSocialId())
                .githubId(user.getGithubId())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .profileColor(user.getProfileColor())
                .introduction(user.getIntroduction())
                .detailIntroduction(user.getDetailIntroduction()).build();
    }

}
