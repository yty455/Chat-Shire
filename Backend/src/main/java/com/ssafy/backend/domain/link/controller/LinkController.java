package com.ssafy.backend.domain.link.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.link.dto.LinkInfo;
import com.ssafy.backend.domain.link.dto.LinkInfoResponse;
import com.ssafy.backend.domain.link.service.LinkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "자료공유 API", description = "자료공유(링크) 관련 API")
@RestController
@RequiredArgsConstructor
public class LinkController {

    private final LinkService linkService;

    @Operation(summary = "자료공유 조회", description = "해당 프로젝트의 자료공유(링크)를 조회합니다.")
    @GetMapping("/projects/{projectId}/links")
    public ResponseEntity<BasicResponse> getLinks(@PathVariable(name = "projectId") Long chatroomId) {

        List<LinkInfoResponse> linkInfoResponses = linkService.getLinks(chatroomId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("자료공유 조회 성공")
                .count(linkInfoResponses.size())
                .result(Collections.singletonList(linkInfoResponses))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "자료공유 등록", description = "자료공유(링크)를 등록합니다. 리턴으로 링크 아이디를 줍니다.")
    @PostMapping("/projects/{projectId}/links")
    public ResponseEntity<BasicResponse> registerLink(@PathVariable(name = "projectId") Long chatRoomId, @RequestBody LinkInfo linkInfo) {

        Long linkId = linkService.registerLink(chatRoomId, linkInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("자료공유 등록 성공")
                .count(1)
                .result(Collections.singletonList(linkId))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "자료공유 수정", description = "등록된 자료공유를 수정합니다.")
    @PatchMapping("/links/{linkId}")
    public ResponseEntity<BasicResponse> modifyLink(@PathVariable(name = "linkId") Long linkId, @RequestBody LinkInfo linkInfo) {

        linkService.modifyLink(linkId, linkInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("자료공유 수정 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "자료공유 삭제", description = "자료공유를 삭제합니다.")
    @DeleteMapping("/links/{linkId}")
    public ResponseEntity<BasicResponse> deleteLink(@PathVariable(name = "linkId") Long linkId) {

        linkService.deleteLink(linkId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("자료공유 삭제 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
