package com.ssafy.backend.domain.chat.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
import com.ssafy.backend.domain.chat.dto.ChatRoomInfoResponse;
import com.ssafy.backend.domain.chat.service.ChatRoomService;
import com.ssafy.backend.domain.common.BasicResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatRoomController {

	private final ChatRoomService chatRoomService;

	@GetMapping("/projects")
	public ResponseEntity<BasicResponse> getMyChatRoom() {
		List<ChatRoomInfoResponse> myChatRooms = chatRoomService.getMyChatRoom();

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 조회 성공")
				.count(myChatRooms.size())
				.result(Collections.singletonList(myChatRooms))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@GetMapping("/projects/{projectId}")
	public ResponseEntity<BasicResponse> getMyChatRoomDetail(@PathVariable("projectId") Long projectId) {
		ChatRoomInfoResponse myChatRoom = chatRoomService.getMyChatRoomDetail(projectId);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 조회 성공")
				.count(1)
				.result(Collections.singletonList(myChatRoom))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@PostMapping("/projects")
	public ResponseEntity<BasicResponse> registerMyChatRoom(@RequestBody ChatRoomInfo chatRoomInfo) {
		chatRoomService.registerMyChatRoom(chatRoomInfo);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 생성 성공")
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@PatchMapping("/projects/{projectId}")
	public ResponseEntity<BasicResponse> modifyMyChatRoom(@RequestBody ChatRoomInfo chatRoomInfo,
			@PathVariable("projectId") Long chatRoomId) {
		chatRoomService.modifyMyChatRoom(chatRoomInfo, chatRoomId);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 수정 성공")
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}
}
