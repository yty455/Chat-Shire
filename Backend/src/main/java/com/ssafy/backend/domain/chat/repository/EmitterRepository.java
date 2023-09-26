package com.ssafy.backend.domain.chat.repository;

import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public interface EmitterRepository {
	SseEmitter save(String emitterId, SseEmitter sseEmitter);

	void saveEventCache(String emitterId, Object event);

	void deleteById(String emitterId);

	Map<String, SseEmitter> findAllEmitterStartWithByUserId(String userId);

	Map<String, Object> findAllEventCacheStartWithByUserId(String userId);
}
