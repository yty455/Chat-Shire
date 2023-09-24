package com.ssafy.backend.domain.post;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.user.Skill;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class PostSkill {
    @Id
    @GeneratedValue
    @Column(name = "POSTSKILL_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "SKILL_ID")
    private Skill skill;



}
