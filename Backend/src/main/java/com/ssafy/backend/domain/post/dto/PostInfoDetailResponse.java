package com.ssafy.backend.domain.post.dto;

import com.ssafy.backend.domain.post.Reply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class PostInfoDetailResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private List<String> skillName;

    // 글 작성자
    private Long userId;
    private String githubId;
    private String profileImage;
    private String profileColor;
    private String nickname;

    private Boolean state;
    private List<ReplyInfoResponse> replies;

    public void setReply(List<ReplyInfoResponse> replies) {
        this.replies = replies;
    }

    public PostInfoDetailResponse(Long id, String title, String content, List<String> skillName, Long userId, String githubId, String profileImage, String profileColor, String nickname, Boolean state, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.skillName = skillName;
        this.userId = userId;
        this.githubId = githubId;
        this.profileImage = profileImage;
        this.profileColor = profileColor;
        this.nickname = nickname;
        this.state = state;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }




}
