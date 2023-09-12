package com.ssafy.backend.domain.task.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.dto.TaskModify;
import com.ssafy.backend.domain.task.dto.TaskRegister;
import com.ssafy.backend.domain.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "태스크 API", description = "태스크 관련 API")
@RestController
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "태스크 등록하기", description = "태스크를 등록합니다.")
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
    @GetMapping("/tasks/{projectId}")
    public ResponseEntity<BasicResponse> getTasks(@PathVariable("projectId") Long chatroomId) {

        List<Task> taskList = taskService.getTasks(chatroomId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 조회 성공")
                .count(taskList.size())
                .result(Collections.singletonList(taskList))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 수정하기", description = "태스크를 수정 합니다.")
    @PatchMapping("/tasks/{taskId}")
    public ResponseEntity<BasicResponse> modifyTask(@PathVariable Long taskId, @RequestBody TaskModify taskModify) {

        taskService.modifyTask(taskId, taskModify);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 수정 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 삭제하기", description = "태스크를 등록합니다.")
    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<BasicResponse> deleteTask(@PathVariable("taskId") Long taskId) {

        taskService.deleteTask(taskId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 삭제 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
