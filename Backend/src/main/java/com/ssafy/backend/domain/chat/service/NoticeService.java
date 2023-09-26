package com.ssafy.backend.domain.chat.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.chat.entity.Notice;
import com.ssafy.backend.domain.chat.repository.NoticeRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NoticeService {

	private final NoticeRepository noticeRepository;

	@Transactional
	public void registerNotification(String content, Long chatRoomId) {
		Notice notice = noticeRepository.findByChatRoomId(chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification by planId", chatRoomId));

		notice.update(content);
	}
}
