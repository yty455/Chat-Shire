package com.ssafy.backend.domain.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.backend.domain.chat.service.NotificationService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "알림", description = "채팅방 초대 알림, 채팅 알림 등 push 알림 기능")
@RestController
@RequiredArgsConstructor
public class NotificationController {
	private final NotificationService notificationService;

	@GetMapping(value = "/subscribe", produces = "text/event-stream")
	public SseEmitter subscribe(
			@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
		return notificationService.subscribe(lastEventId);
	}
}
