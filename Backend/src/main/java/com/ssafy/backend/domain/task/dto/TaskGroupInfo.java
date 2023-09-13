package com.ssafy.backend.domain.task.dto;

import com.ssafy.backend.domain.task.Priority;
import com.ssafy.backend.domain.task.TaskGroup;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
public class TaskGroupInfo {
    private String name;
    @Enumerated(EnumType.STRING)
    private Priority priority;

}
