package com.ssafy.backend.domain.task;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaskGroup {
    @Id
    @GeneratedValue
    @Column(name = "TASKGROUP_ID")
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;
}
