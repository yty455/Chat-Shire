package com.ssafy.backend.domain.attachedFile.controller;

import com.ssafy.backend.domain.attachedFile.Category;
import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
import com.ssafy.backend.domain.attachedFile.service.AttachedFileService;
import com.ssafy.backend.domain.common.BasicResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@Tag(name = "첨부파일 서랍 API", description = "첨부파일 서랍 관련 API")
@RestController
@RequiredArgsConstructor
public class AttachedFileController {

    private final AttachedFileService attachedFileService;

    @Operation(summary = "해당 프로젝트 첨부파일 서랍 조회", description = "해당 프로젝트의 해당 카테고리의 첨부파일을 조회합니다. 카테고리 종류 - IMAGE, VIDEO, FILE")
    @GetMapping("/projects/{projectId}/files/{category}")
    public ResponseEntity<BasicResponse> getTasks(@PathVariable("projectId") Long chatroomId, @PathVariable("category") Category category) {

        List<AttachedFileInfo> attachedFileInfos = attachedFileService.getAttachedFiles(chatroomId, category);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("첨부파일 서랍 조회 성공")
                .count(attachedFileInfos.size())
                .result(Collections.singletonList(attachedFileInfos))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
