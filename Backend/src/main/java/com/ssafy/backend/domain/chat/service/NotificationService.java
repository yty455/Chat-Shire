package com.ssafy.backend.domain.chat.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.chat.entity.Notification;
import com.ssafy.backend.domain.chat.repository.NotificationRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {

	private final NotificationRepository notificationRepository;

	@Transactional
	public void registerNotification(String content, Long chatRoomId) {
		Notification notification = notificationRepository.findByChatRoomId(chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification by planId", chatRoomId));

		notification.update(content);
	}
}
