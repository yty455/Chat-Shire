package com.ssafy.backend.domain.task.dto;

import com.ssafy.backend.domain.task.Priority;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.TaskGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class TaskGroupInfoResponse {
    private Long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    private List<TaskInfoResponse> taskInfoResponses = new ArrayList<>();

    public void setTaskInfoResponses(List<TaskInfoResponse> taskInfoResponses){this.taskInfoResponses=taskInfoResponses;}

    public static TaskGroupInfoResponse fromEntity(TaskGroup taskGroup){
        return TaskGroupInfoResponse.builder()
                .id(taskGroup.getId())
                .name(taskGroup.getName())
                .priority(taskGroup.getPriority()).build();
    }

    public static List<TaskGroupInfoResponse> fromEntityList(List<TaskGroup> taskGroups){
        return taskGroups.stream()
                .map(TaskGroupInfoResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
