package com.ssafy.backend.domain.post.dto;

import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
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
    private List<AttachedFileInfo> attachedFileInfos;

    // 글 작성자
    private Long userId;
    private String githubId;
    private String profileImage;
    private String profileColor;
    private String nickname;

    private int state;
    private List<ReplyInfoResponse> replies;

    public void setSkillName(List<String> skillName) {
        this.skillName = skillName;
    }

    public void setReply(List<ReplyInfoResponse> replies) {
        this.replies = replies;
    }

    public void setAttachedFileInfos(List<AttachedFileInfo> attachedFileInfos) {
        this.attachedFileInfos = attachedFileInfos;
    }

    public PostInfoDetailResponse(Long id, String title, String content, Long userId, String githubId, String profileImage, String profileColor, String nickname, int state, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.title = title;
        this.content = content;
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
