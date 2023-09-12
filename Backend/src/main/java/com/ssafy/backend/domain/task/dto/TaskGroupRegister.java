package com.ssafy.backend.domain.task.dto;

import com.ssafy.backend.domain.task.Priority;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
public class TaskGroupRegister {
    private Long chatRoomId;
    private String name;
    @Enumerated(EnumType.STRING)
    private Priority priority;
}
