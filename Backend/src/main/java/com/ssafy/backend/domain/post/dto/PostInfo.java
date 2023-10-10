package com.ssafy.backend.domain.post.dto;

import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.user.User;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class PostInfo {
    private String title;
    private String content;
    private int state;
    private List<String> skillName = new ArrayList<>();
    private List<AttachedFileInfo> attachedFileInfos = new ArrayList<>();

    public static Post toEntity(User user, ChatRoom chatRoom, PostInfo postInfo) {
        return Post.builder()
                .state(0)
                .title(postInfo.getTitle())
                .content(postInfo.getContent())
                .chatRoom(chatRoom)
                .user(user).build();
    }
}
