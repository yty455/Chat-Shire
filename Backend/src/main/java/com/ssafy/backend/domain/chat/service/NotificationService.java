package com.ssafy.backend.domain.chat.service;

import static com.ssafy.backend.domain.common.GlobalMethod.*;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.ssafy.backend.domain.chat.dto.NotificationResponse;
import com.ssafy.backend.domain.chat.entity.Notification;
import com.ssafy.backend.domain.chat.entity.Participation;
import com.ssafy.backend.domain.chat.repository.EmitterRepository;
import com.ssafy.backend.domain.chat.repository.NotificationRepository;
import com.ssafy.backend.domain.user.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {
	private final EmitterRepository emitterRepository;
	private final NotificationRepository notificationRepository;

	private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

	public SseEmitter subscribe(String lastEventId) {
		Long userId = getUserId();
		String emitterId = userId + "_" + System.currentTimeMillis();
		SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

		emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
		emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));

		sendToClient(emitter, emitterId, "EventStream Created. [userId=" + userId + "]");

		if (!lastEventId.isEmpty()) {
			Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByUserId(String.valueOf(userId));
			events.entrySet().stream()
					.filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
					.forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
		}

		return emitter;
	}

	public void send(User receiver, Participation participation, String content, String url) {
		Notification notification = notificationRepository.save(
				Notification.create(receiver, participation, content, url));
		String userId = String.valueOf(receiver.getId());

		Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByUserId(userId);
		sseEmitters.forEach(
				(key, emitter) -> {
					emitterRepository.saveEventCache(key, notification);
					sendToClient(emitter, key, NotificationResponse.toDto(notification));
				}
		);
	}

	private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
		try {
			emitter.send(SseEmitter.event()
					.id(emitterId)
					.data(data));
		} catch (IOException exception) {
			emitterRepository.deleteById(emitterId);
			throw new IllegalArgumentException("SSE 뭔가 문제가 생겼다");
		}
	}
}
