package com.ssafy.backend.domain.task;

import com.ssafy.backend.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reference extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REFERENCE_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "TASK_ID")
    private Task task;

    private String nickname;
    private String content;
    private Long chatNumber;
    private LocalDateTime chatTime;
}
