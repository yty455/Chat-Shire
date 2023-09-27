package com.ssafy.backend.domain.chat.controller;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.chat.dto.MyInvitationResponse;
import com.ssafy.backend.domain.chat.service.InvitationService;
import com.ssafy.backend.domain.common.BasicResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "프로젝트 채팅방 초대", description = "프로젝트 채팅방 초대 관련 API")
@RestController
@RequiredArgsConstructor
public class InvitationController {

	private final InvitationService invitationService;
	@Operation(summary = "초대 조회", description = "내가 받은 초대를 조회합니다.")
	@GetMapping("/invitation")
	public ResponseEntity<BasicResponse> getMyInvitation() {
		List<MyInvitationResponse> myInvitations = invitationService.getMyInvitation().stream()
				.map(MyInvitationResponse::toDto)
				.collect(Collectors.toList());

		BasicResponse basicResponse = BasicResponse.builder()
				.message("내가 받은 초대 조회 성공")
				.count(myInvitations.size())
				.result(Collections.singletonList(myInvitations))
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}
}
