package com.ssafy.backend.domain.mindmap.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.mindmap.dto.MindMapNodeInfo;
import com.ssafy.backend.domain.mindmap.service.MindMapService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "아이디어 마인드맵", description = "아이디어 마인드맵 관련 API")
@RestController
@RequiredArgsConstructor
public class MindMapController {

	private final MindMapService mindMapService;

	@Operation(summary = "프로젝트 아이디어 마인드맵 조회", description = "해당 프로젝트의 아이디어 마인드맵을 조회할 수 있습니다.")
	@GetMapping("/projects/{projectId}/mind-map")
	public ResponseEntity<BasicResponse> getMindMap(@PathVariable("projectId") Long chatRoomId) {
		List<MindMapNodeInfo> mindMap = mindMapService.getMindMap(chatRoomId);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 전체 조회 성공")
				.count(mindMap.size())
				.result(Collections.singletonList(mindMap))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "프로젝트 아이디어 마인드맵 저장", description = "해당 프로젝트의 아이디어 마인드맵을 저장할 수 있습니다.")
	@PostMapping("/projects/{projectId}/mind-map")
	public ResponseEntity<BasicResponse> postMindMap(@PathVariable("projectId") Long chatRoomId, List<MindMapNodeInfo> mindMapNodes) {
//		mindMapService.saveMinMap(chatRoomId, mindMapNodes);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 전체 저장 성공")
//				.count(mindMap.size())
//				.result(Collections.singletonList(mindMap))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}
}
