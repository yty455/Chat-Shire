package com.ssafy.backend.domain.chat.entity;

import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHAT_ID")
    private Long id;

    @Column(length = 500)
    private String content;
    private Long chatNumber;
    private LocalDateTime chatTime;
    private Boolean isAttached;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;

}
