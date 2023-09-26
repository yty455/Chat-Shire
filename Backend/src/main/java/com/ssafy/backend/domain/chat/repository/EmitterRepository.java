package com.ssafy.backend.domain.chat.repository;

import java.util.Map;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EmitterRepository {
	SseEmitter save(String emitterId, SseEmitter sseEmitter);

	void saveEventCache(String emitterId, Object event);

	void deleteById(String emitterId);

	Map<String, SseEmitter> findAllEmitterStartWithByUserId(String userId);

	Map<String, Object> findAllEventCacheStartWithByUserId(String userId);
}
