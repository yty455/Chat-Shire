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
public class PostInfoResponse {
    private Long id;
    private String title;
    private List<String> skillName;
    private String profileImage;
    private String profileColor;
    private int state;
    private String reply;
    private Long replyCount;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private List<AttachedFileInfo> attachedFileInfos;

    public void setReply(String reply) {
        this.reply = reply;
    }

    public void setSkillName(List<String> skillName) {
        this.skillName = skillName;
    }

    public void setReplyCount(Long replyCount) {
        this.replyCount = replyCount;
    }

    public void setAttachedFileInfos(List<AttachedFileInfo> attachedFileInfos) {
        this.attachedFileInfos = attachedFileInfos;
    }

    public PostInfoResponse(Long id, String title, int state, String profileImage, String profileColor, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.profileImage = profileImage;
        this.profileColor = profileColor;
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;

    }
}
