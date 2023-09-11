package com.ssafy.backend.domain.chat.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.chat.service.ChatRoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatRoomController {

	private final ChatRoomService chatRoomService;
	private final ChatRoomRepository chatRoomRepository;

	@PostMapping("/projects")
	public void registerMyChatRoom(@RequestBody ChatRoomInfo chatRoomInfo) {
		chatRoomService.registerMyChatRoom(chatRoomInfo);
	}
}
