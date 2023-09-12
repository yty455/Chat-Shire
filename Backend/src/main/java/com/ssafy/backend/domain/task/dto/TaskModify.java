package com.ssafy.backend.domain.task.dto;

import com.ssafy.backend.domain.task.Priority;
import com.ssafy.backend.domain.task.Progress;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Getter
public class TaskModify {
    private Long taskGroupId; // -1이면 개인 태스크인 상태
    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Enumerated(EnumType.STRING)
    private Progress progress;
    private LocalDate deadline;
}
