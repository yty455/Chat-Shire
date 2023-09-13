package com.ssafy.backend.domain.chat;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "CHAT_ID")
    private Long id;

    private String content;
    private Long chatNumber;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private Long userId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;

}
