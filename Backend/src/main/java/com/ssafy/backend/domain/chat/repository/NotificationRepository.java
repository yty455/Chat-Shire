package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.entity.AcceptanceStatus;
import com.ssafy.backend.domain.chat.entity.Notification;
import com.ssafy.backend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByReceiver(User user);

    List<Notification> findAllByReceiverIdAndStatus(Long receiverId, AcceptanceStatus status);

    void deleteAllByParticipationId(Long chatRoomId);
}
