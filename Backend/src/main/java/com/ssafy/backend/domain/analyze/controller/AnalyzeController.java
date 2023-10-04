package com.ssafy.backend.domain.analyze.controller;

import com.ssafy.backend.domain.analyze.dto.ProjectStatistic;
import com.ssafy.backend.domain.analyze.service.StatisticService;
import com.ssafy.backend.domain.common.BasicResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@Tag(name = "통계 분석 API", description = "통계 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
public class AnalyzeController {
    private final StatisticService statisticService;

    @Operation(summary = "프로젝트 통계 조회", description = "프로젝트 전체 통계 관련 정보를 조회합니다.")
    @GetMapping("/projects/{projectId}/statistic")
    public ResponseEntity<BasicResponse> getStatistic(@PathVariable("projectId") Long chatRoomId) {

        ProjectStatistic projectStatistic = statisticService.getStatistic(chatRoomId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("통계 조회 성공")
                .count(1)
                .result(Collections.singletonList(projectStatistic))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
