package com.ssafy.backend.domain.task.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class TaskRegister {

    private Long chatroomId;
    private String name;
    private String description;
    private LocalDate deadline;

}
