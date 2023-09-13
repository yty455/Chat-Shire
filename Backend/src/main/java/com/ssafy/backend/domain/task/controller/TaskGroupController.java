package com.ssafy.backend.domain.task.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.TaskGroup;
import com.ssafy.backend.domain.task.dto.TaskGroupInfo;
import com.ssafy.backend.domain.task.dto.TaskGroupRegister;
import com.ssafy.backend.domain.task.service.TaskGroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "태스크 그룹 API", description = "태스크 그룹 관련 API")
@RestController
@RequiredArgsConstructor
public class TaskGroupController {

    private final TaskGroupService taskGroupService;

    @Operation(summary = "태스크 그룹 생성", description = "태스크 그룹을 생성합니다.")
    @PostMapping("/taskGroup")
    public ResponseEntity<BasicResponse> createTaskGroup(@RequestBody TaskGroupRegister taskGroupRegister) {

        taskGroupService.createTaskGroup(taskGroupRegister);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 그룹 생성 완료")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    // TODO - 어떤값 줄지 합의보고 리턴 DTO 만들어서 주기
    @Operation(summary = "태스크 그룹 조회", description = "프로젝트의 태스크 그룹을 조회합니다.")
    @GetMapping("/taskGroup/{projectId}")
    public ResponseEntity<BasicResponse> getTaskGroup(@PathVariable(name = "projectId") Long chatRoomId) {

        List<TaskGroup> taskGroupList = taskGroupService.getTaskGroup(chatRoomId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 그룹 조회 완료")
                .count(taskGroupList.size())
                .result(Collections.singletonList(taskGroupList))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 그룹 수정", description = "태스크 그룹의 정보를 수정 합니다.")
    @PatchMapping("/taskGroup/{taskGroupId}")
    public ResponseEntity<BasicResponse> modifyTask(@PathVariable(name = "taskGroupId") Long taskGroupId, @RequestBody TaskGroupInfo taskGroupInfo) {

        taskGroupService.modifyTaskGroup(taskGroupId, taskGroupInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 수정 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "태스크 그룹 삭제", description = "태스크 그룹을 삭제합니다.")
    @DeleteMapping("/taskGroup/{taskGroupId}")
    public ResponseEntity<BasicResponse> getReference(@PathVariable(name = "taskGroupId") Long taskGroupId) {

        taskGroupService.deleteTaskGroup(taskGroupId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("태스크 그룹 삭제 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
