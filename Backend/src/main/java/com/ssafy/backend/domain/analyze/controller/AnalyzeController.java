package com.ssafy.backend.domain.analyze.controller;

import java.util.Collections;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.analyze.Statistic;
import com.ssafy.backend.domain.analyze.dto.ProjectStatistic;
import com.ssafy.backend.domain.analyze.service.StatisticService;
import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.task.repository.TaskRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "통계 분석 API", description = "통계 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
public class AnalyzeController {
	private final StatisticService statisticService;
	private final TaskRepository taskRepository;

	@Operation(summary = "프로젝트 통계 조회", description = "프로젝트 전체 통계 관련 정보를 조회합니다.")
	@GetMapping("/projects/{projectId}/statistic")
	public ResponseEntity<BasicResponse> getChat(@PathVariable("projectId") Long chatRoomId){

		// 커밋 수 조회
		Statistic statistic = statisticService.getCommitCount(chatRoomId);
		// 태스크 수 조회
		Long taskCount = taskRepository.countByProjectId(chatRoomId);
		// TODO: 에러 게시판 + 댓글 수 합 조회(에러 게시판 만들면)
		// TODO: 채팅에서 나온 카테고리 수 조회
		// TODO: 주제 관련 카테고리 수 조회

		ProjectStatistic projectStatistic = ProjectStatistic.toProjectStatistic(statistic, taskCount);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("통계 조회 성공")
				.count(1)
				.result(Collections.singletonList(projectStatistic))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}
}
