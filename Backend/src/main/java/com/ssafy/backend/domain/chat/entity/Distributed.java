package com.ssafy.backend.domain.chat.entity;

import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Entity
public class Distributed {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "DISTRIBUTED_ID")
    private Long id;

    private String word;
    private Long count;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @JoinColumn(name = "CHATROOM_ID")
    @ManyToOne(fetch = LAZY)
    private ChatRoom chatRoom;


}
