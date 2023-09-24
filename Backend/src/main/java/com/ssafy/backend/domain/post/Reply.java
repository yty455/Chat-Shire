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
public class Reply {
    @Id
    @GeneratedValue
    @Column(name = "REPLY_ID")
    private Long id;

    private String content;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    public void update(String content){
        this.content = content;
    }

}
