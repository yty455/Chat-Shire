package com.ssafy.backend.domain.chat.service;

import static com.ssafy.backend.domain.common.GlobalMethod.*;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfoResponse;
import com.ssafy.backend.domain.chat.entity.AcceptanceStatus;
import com.ssafy.backend.domain.chat.entity.Notification;
import com.ssafy.backend.domain.chat.repository.NotificationRepository;
import com.ssafy.backend.domain.common.GlobalMethod;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InvitationService {

	private final NotificationRepository notificationRepository;

	public List<Notification> getMyInvitation() {
		return notificationRepository.findAllByReceiverIdAndStatus(getUserId(), AcceptanceStatus.NOT_READ);
	}
}
