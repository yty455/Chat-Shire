package com.ssafy.backend.domain.chat.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.chat.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

	Optional<Notice> findByChatRoomId(Long chatRoomId);
}
