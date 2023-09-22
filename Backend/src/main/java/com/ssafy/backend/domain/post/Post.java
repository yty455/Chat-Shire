package com.ssafy.backend.domain.post;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Post {
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

}
