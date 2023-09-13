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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class TaskInfoDetailResponse {
    private Long id;
    private Long taskGroupId; // -1이면 개인 태스크인 상태
    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private Priority priority;
    @Enumerated(EnumType.STRING)
    private Progress progress;
    private LocalDate deadline;

    private List<ReferenceInfoResponse> referenceInfoResponses = new ArrayList<>();

    public void setReferenceInfoResponse(List<ReferenceInfoResponse> referenceInfoResponses){
        this.referenceInfoResponses=referenceInfoResponses;
    }

    public static TaskInfoDetailResponse fromEntity(Task task){
        return TaskInfoDetailResponse.builder()
                .id(task.getId())
                .taskGroupId(task.getTaskGroupId())
                .name(task.getName())
                .description(task.getDescription())
                .priority(task.getPriority())
                .progress(task.getProgress())
                .deadline(task.getDeadline()).build();
    }

    public static List<TaskInfoDetailResponse> fromEntityList(List<Task> tasks){
        return tasks.stream()
                .map(TaskInfoDetailResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
