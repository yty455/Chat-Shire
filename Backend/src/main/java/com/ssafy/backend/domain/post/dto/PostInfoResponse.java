package com.ssafy.backend.domain.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private Boolean state;
    private String reply;
    private int replyCount;

    public void setReply(String reply) {
        this.reply = reply;
    }

    public void setSkillName(List<String> skillName){
        this.skillName = skillName;
    }


    public PostInfoResponse(Long id, String title, Boolean state, String profileImage, String profileColor, int replyCount) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.profileImage = profileImage;
        this.profileColor = profileColor;
        this.replyCount = replyCount;
    }
}
