package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Optional<Notice> findByChatRoomId(Long chatRoomId);
}
