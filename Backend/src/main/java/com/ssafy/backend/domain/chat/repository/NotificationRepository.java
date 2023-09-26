package com.ssafy.backend.domain.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.chat.entity.Notification;
import com.ssafy.backend.domain.user.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	List<Notification> findAllByReceiver(User user);
}
