package com.ssafy.backend.domain.task.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.dto.TaskModify;
import com.ssafy.backend.domain.task.dto.TaskRegist;
import com.ssafy.backend.domain.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Tag(name = "태스크 API", description = "태스크 관련 API")
@RestController
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "태스크 등록하기", description = "태스크를 DB에 등록합니다.")
    @Parameter(name = "TaskRegister", description = "dto에 해당하는 정보를 넘겨주세요. 비어있어도 저장 가능.")
    @PostMapping("/tasks")
    public ResponseEntity<BasicResponse> registerTask(@RequestBody TaskRegist taskRegist) {

        taskService.registerTask(taskRegist);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("태스크 등록 성공")
                .count(1)
                .result(Collections.singletonList(1))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 수정하기", description = "태스크를 수정 합니다.")
    @Parameter(name = "TaskModify", description = "task id와 태스크 수정 dto를 넘겨주세요.")
    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<BasicResponse> modifyTask(@PathVariable Long taskId, @RequestBody TaskModify taskModify) {

        taskService.modifyTask(taskId, taskModify);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("태스크 수정 성공")
                .count(1)
                .result(Collections.singletonList(1))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }



    @Operation(summary = "참조 조회하기", description = "태스크가 참조중인 채팅을 불러옵니다.")
    @Parameter(name = "taskId", description = "조회할 태스크의 id를 넘겨주세요.")
    @GetMapping("/reference/{taskId}")
    public ResponseEntity<BasicResponse> getReference(@PathVariable Long taskId) {
        BasicResponse basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("다이어리 상세 조회 성공")
                    .count(1)
                    .result(Collections.singletonList(1)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
