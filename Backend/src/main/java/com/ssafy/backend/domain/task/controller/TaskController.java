package com.ssafy.backend.domain.task.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.dto.TaskInfo;
import com.ssafy.backend.domain.task.dto.TaskInfoResponse;
import com.ssafy.backend.domain.task.dto.TaskRegister;
import com.ssafy.backend.domain.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "태스크 API", description = "태스크 관련 API")
@RestController
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "태스크 등록", description = "태스크를 등록합니다.")
    @PostMapping("/tasks")
    public ResponseEntity<BasicResponse> registerTask(@RequestBody TaskRegister taskRegister) {

        Long taskId = taskService.registerTask(taskRegister);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 등록 성공")
                .count(1)
                .result(Collections.singletonList(taskId))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 조회", description = "프로젝트의 태스크를 조회합니다.")
    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<BasicResponse> getTasks(@PathVariable("projectId") Long chatroomId) {

        List<TaskInfoResponse> taskList = taskService.getTasks(chatroomId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 조회 성공")
                .count(taskList.size())
                .result(Collections.singletonList(taskList))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 수정", description = "태스크를 수정 합니다.")
    @PatchMapping("/tasks/{taskId}")
    public ResponseEntity<BasicResponse> modifyTask(@PathVariable Long taskId, @RequestBody TaskInfo taskInfo) {

        taskService.modifyTask(taskId, taskInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 수정 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 삭제", description = "태스크를 등록합니다.")
    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<BasicResponse> deleteTask(@PathVariable("taskId") Long taskId) {

        taskService.deleteTask(taskId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 삭제 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 소속 그룹 변경", description = "태스크가 소속된 그룹을 변경합니다. ( 소속없음:taskGroupId = 0 )")
    @PutMapping("/taskGroup/{taskGroupId}/tasks/{taskId}")
    public ResponseEntity<BasicResponse> joinTaskGroup(@PathVariable(name = "taskGroupId") Long taskGroupId, @PathVariable(name = "taskId") Long taskId) {

        taskService.joinTaskGroup(taskGroupId, taskId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 소속 그룹 변경 완료")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
