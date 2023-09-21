package com.ssafy.backend.domain.task.dto;

import com.ssafy.backend.domain.task.Priority;
import com.ssafy.backend.domain.task.Progress;
import com.ssafy.backend.domain.task.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class TaskInfoResponse {
    private Long id;
    private Long taskGroupId; // 0이면 개인 태스크인 상태
    private String description;
    @Enumerated(EnumType.STRING)
    private Progress progress;

    public static TaskInfoResponse fromEntity(Task task){
        return TaskInfoResponse.builder()
                .id(task.getId())
                .taskGroupId(task.getTaskGroupId())
                .description(task.getDescription())
                .progress(task.getProgress()).build();
    }

    public static List<TaskInfoResponse> fromEntityList(List<Task> tasks){
        return tasks.stream()
                .map(TaskInfoResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
