package com.ssafy.backend.domain.task.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.service.ReferenceService;
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
public class ReferenceController {

    private final TaskService taskService;
    private final ReferenceService referenceService;

    @Operation(summary = "참조 등록하기", description = "태스크가 참조중인 채팅을 불러옵니다.")
    @Parameter(name = "taskId", description = "조회할 태스크의 id를 넘겨주세요.")
    @PostMapping("/reference/{taskId}")
    public ResponseEntity<BasicResponse> registerReference(@PathVariable Long taskId) {

        referenceService.registerReference(taskId);
        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("다이어리 상세 조회 성공")
                .count(1)
                .result(Collections.singletonList(1)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "참조 조회하기", description = "태스크가 참조중인 채팅을 불러옵니다.")
    @Parameter(name = "taskId", description = "조회할 태스크의 id를 넘겨주세요.")
    @GetMapping("/reference/{taskId}")
    public ResponseEntity<BasicResponse> getReference(@PathVariable Long taskId) {

        referenceService.getReference(taskId);
        BasicResponse basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("다이어리 상세 조회 성공")
                    .count(1)
                    .result(Collections.singletonList(1)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "참조 삭제하기", description = "태스크가 참조중인 채팅을 불러옵니다.")
    @Parameter(name = "taskId", description = "조회할 태스크의 id를 넘겨주세요.")
    @DeleteMapping("/reference/{taskId}")
    public ResponseEntity<BasicResponse> deleteReference(@PathVariable Long taskId) {

        referenceService.deleteReference(taskId);
        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("다이어리 상세 조회 성공")
                .count(1)
                .result(Collections.singletonList(1)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
