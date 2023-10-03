package com.ssafy.backend.domain.analyze.controller;

import com.ssafy.backend.domain.analyze.dto.KeywordsRequest;
import com.ssafy.backend.domain.analyze.dto.MyKeywords;
import com.ssafy.backend.domain.analyze.service.KeywordService;
import com.ssafy.backend.domain.common.BasicResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "프로젝트 키워드", description = "프로젝트의 키워드 관련된 기능들로 채팅 기반 도출된 카테고리들이 나옵니다.")
@RestController
@RequiredArgsConstructor
public class KeywordController {
    private final KeywordService keywordService;

    @Operation(summary = "프로젝트 키워드 조회", description = "설정한 프로젝트 키워드를 조회합니다.")
    @GetMapping("/projects/{projectId}/keywords")
    public ResponseEntity<BasicResponse> getKeywords(@PathVariable("projectId") Long chatRoomId) {

        List<MyKeywords> keywords = keywordService.getKeywords(chatRoomId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("프로젝트 키워드 조회 성공")
                .count(1)
                .result(Collections.singletonList(keywords))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "프로젝트 키워드 등록", description = "프로젝트에 적합한 키워드를 등록합니다.")
    @PostMapping("/projects/{projectId}/keywords")
    public ResponseEntity<BasicResponse> registerKeywords(@PathVariable("projectId") Long chatRoomId,
                                                          @RequestBody KeywordsRequest keywordsRequest) {

        keywordService.registerKeywords(chatRoomId, keywordsRequest.getWords());

        BasicResponse basicResponse = BasicResponse.builder()
                .message("프로젝트 키워드 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "프로젝트 키워드 삭제", description = "등록한 키워드를 삭제합니다.")
    @DeleteMapping("/projects/{projectId}/keywords")
    public ResponseEntity<BasicResponse> deleteKeywords(@PathVariable("projectId") Long chatRoomId,
                                                          @RequestBody KeywordsRequest keywordsRequest) {

        keywordService.deleteKeywords(chatRoomId, keywordsRequest.getWords());

        BasicResponse basicResponse = BasicResponse.builder()
                .message("프로젝트 키워드 삭제 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
