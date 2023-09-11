package com.ssafy.backend.domain.task;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Task {

    @Id
    @GeneratedValue
    @Column(name = "TASK_ID")
    private Long id;

    private Long taskGroupId;

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private LocalDate deadline;
}
