package com.ssafy.backend.domain.post;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.post.dto.PostInfo;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.util.function.Consumer;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Post extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "POST_ID")
    private Long id;

    private String title;
    private String content;
    private Boolean state;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;

    public void update(PostInfo postInfo) {
        updateTitle(postInfo.getTitle());
        updateContent(postInfo.getContent());
    }

    private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
        if (newValue != null) {
            updater.accept(newValue);
        }
    }

    public void updateTitle(String title) {
        updateIfNotNull(newValue -> this.title = newValue, title);
    }

    public void updateContent(String content) {
        updateIfNotNull(newValue -> this.content = newValue, content);
    }

}
