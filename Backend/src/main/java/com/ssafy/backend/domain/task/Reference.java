package com.ssafy.backend.domain.task;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reference {

    @Id
    @GeneratedValue
    @Column(name = "REFERENCE_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "TASK_ID")
    private Task task;

    private Long chatNumber;
}
