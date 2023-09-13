package com.ssafy.backend.domain.task.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.dto.ReferenceInfo;
import com.ssafy.backend.domain.task.dto.ReferenceInfoResponse;
import com.ssafy.backend.domain.task.service.ReferenceService;
import com.ssafy.backend.domain.task.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "태스크 참조 API", description = "참조 API")
@RestController
@RequiredArgsConstructor
public class ReferenceController {

    private final TaskService taskService;
    private final ReferenceService referenceService;

    @Operation(summary = "참조 등록하기", description = "태스크에 채팅을 등록합니다. 참조 ID 를 리턴합니다.")
    @PostMapping("/tasks/{taskId}/references")
    public ResponseEntity<BasicResponse> registerReference(@PathVariable("taskId") Long taskId, @RequestBody ReferenceInfo referenceInfo) {

        Long id = referenceService.registerReference(taskId, referenceInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("참조 등록 완료")
                .count(1)
                .result(Collections.singletonList(id)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "참조 조회하기", description = "태스크가 참조중인 채팅을 불러옵니다.")
    @GetMapping("tasks/{taskId}/references")
    public ResponseEntity<BasicResponse> getReference(@PathVariable Long taskId) {

        List<ReferenceInfoResponse> referenceInfoResponses = referenceService.getReference(taskId);
        BasicResponse basicResponse = BasicResponse.builder()
                    .message("참조 조회 성공")
                    .count(referenceInfoResponses.size())
                    .result(Collections.singletonList(referenceInfoResponses)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    // TODO: 참조 상세 조회 - 참조중인 채팅 위아래 채팅내역 불러오는 식으로

    @Operation(summary = "참조 삭제하기", description = "태스크의 참조를 삭제합니다.")
    @DeleteMapping("/tasks/{taskId}/references/{referenceId}")
    public ResponseEntity<BasicResponse> deleteReference(@PathVariable(name = "taskId") Long taskId, @PathVariable(name = "referenceId") Long referenceId) {

        referenceService.deleteReference(referenceId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("참조 삭제 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
