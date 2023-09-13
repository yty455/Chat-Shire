package com.ssafy.backend.domain.chat.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
import com.ssafy.backend.domain.chat.dto.ChatRoomInfoDetailResponse;
import com.ssafy.backend.domain.chat.dto.ChatRoomInfoResponse;
import com.ssafy.backend.domain.chat.service.ChatRoomService;
import com.ssafy.backend.domain.common.BasicResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "프로젝트 채팅방", description = "프로젝트 채팅방 관련 API")
@RestController
@RequiredArgsConstructor
public class ChatRoomController {

	private final ChatRoomService chatRoomService;

	@Operation(summary = "내 프로젝트 전체 조회", description = "내가 참여하고 있는 프로젝트의 채팅방들을 모두 보여줍니다.")
	@GetMapping("/projects")
	public ResponseEntity<BasicResponse> getMyChatRoom() {
		List<ChatRoomInfoResponse> myChatRooms = chatRoomService.getMyChatRoom();

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 전체 조회 성공")
				.count(myChatRooms.size())
				.result(Collections.singletonList(myChatRooms))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "내 프로젝트 상세 조회", description = "내가 참여하고 있는 프로젝트의 하나의 채팅방 정보를 보여줍니다.")
	@GetMapping("/projects/{projectId}")
	public ResponseEntity<BasicResponse> getMyChatRoomDetail(@PathVariable("projectId") Long projectId) {
		ChatRoomInfoDetailResponse myChatRoomDetail = chatRoomService.getMyChatRoomDetail(projectId);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 상세 조회 성공")
				.count(1)
				.result(Collections.singletonList(myChatRoomDetail))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "내 프로젝트 생성", description = "프로젝트 채팅방을 만듭니다.")
	@PostMapping("/projects")
	public ResponseEntity<BasicResponse> registerMyChatRoom(@RequestBody ChatRoomInfo chatRoomInfo) {
		chatRoomService.registerMyChatRoom(chatRoomInfo);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 생성 성공")
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "내 프로젝트 수정", description = "내가 참여하고 있는 프로젝트의 정보를 수정합니다.")
	@PatchMapping("/projects/{projectId}")
	public ResponseEntity<BasicResponse> modifyMyChatRoom(@RequestBody ChatRoomInfo chatRoomInfo,
			@PathVariable("projectId") Long chatRoomId) {
		chatRoomService.modifyMyChatRoom(chatRoomInfo, chatRoomId);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 수정 성공")
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "내 프로젝트 나가기", description = "내가 참여하고 있는 프로젝트의 채팅방을 나갑니다.")
	@DeleteMapping("/projects/{projectId}")
	public ResponseEntity<BasicResponse> deleteMyChatRoom(@PathVariable("projectId") Long chatRoomId) {
		chatRoomService.deleteMyChatRoom(chatRoomId);

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내 프로젝트 채팅방 나가기 성공")
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}
}
