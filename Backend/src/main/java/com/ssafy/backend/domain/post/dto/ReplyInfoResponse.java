package com.ssafy.backend.domain.post.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReplyInfoResponse {


    // 댓글 정보
    private Long replyId;
    private String content;

    // 댓글 작성자 정보
    private Long userId;
    private String nickname;
    private String githubId;
    private String profileImage;
    private String profileColor;

    public ReplyInfoResponse(Long replyId, String content, Long userId, String nickname, String githubId, String profileImage, String profileColor) {
        this.replyId = replyId;
        this.content = content;
        this.userId = userId;
        this.nickname = nickname;
        this.githubId = githubId;
        this.profileImage = profileImage;
        this.profileColor = profileColor;
    }

}
