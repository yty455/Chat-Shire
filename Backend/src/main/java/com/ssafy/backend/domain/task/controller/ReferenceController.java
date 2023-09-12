package com.ssafy.backend.domain.task.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.Reference;
import com.ssafy.backend.domain.task.dto.ReferenceRegist;
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

@Tag(name = "태스크 참조 API", description = "참조 API")
@RestController
@RequiredArgsConstructor
public class ReferenceController {

    private final TaskService taskService;
    private final ReferenceService referenceService;

    @Operation(summary = "참조 등록하기", description = "태스크에 채팅을 등록합니다.")
    @PostMapping("/reference/{taskId}")
    public ResponseEntity<BasicResponse> registerReference(@PathVariable("taskId") Long taskId, @RequestBody ReferenceRegist referenceRegist) {

        referenceService.registerReference(taskId, referenceRegist);


        BasicResponse basicResponse = BasicResponse.builder()
                .message("참조 등록 완료")
                .count(1)
                .result(Collections.singletonList(1)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "참조 조회하기", description = "태스크가 참조중인 채팅을 불러옵니다.")
    @GetMapping("/reference/{taskId}")
    public ResponseEntity<BasicResponse> getReference(@PathVariable Long taskId) {

        referenceService.getReference(taskId);
        BasicResponse basicResponse = BasicResponse.builder()
                    .message("다이어리 상세 조회 성공")
                    .count(1)
                    .result(Collections.singletonList(1)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "참조 삭제하기", description = "태스크가 참조중인 채팅을 불러옵니다.")
    @DeleteMapping("/reference/{taskId}")
    public ResponseEntity<BasicResponse> deleteReference(@PathVariable Long taskId) {

        referenceService.deleteReference(taskId);
        BasicResponse basicResponse = BasicResponse.builder()
                .message("다이어리 상세 조회 성공")
                .count(1)
                .result(Collections.singletonList(1)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
