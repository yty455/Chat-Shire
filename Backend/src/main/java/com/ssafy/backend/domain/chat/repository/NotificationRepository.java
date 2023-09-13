package com.ssafy.backend.domain.chat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.chat.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

	Optional<Notification> findByChatRoomId(Long chatRoomId);
}
