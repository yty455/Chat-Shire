package com.ssafy.backend.domain.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.chat.entity.Participation;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

	List<Participation> findByUserId(Long userId);

	Optional<Participation> findByUserIdAndChatRoomId(Long userId, Long chatRoomId);

	void deleteByUserIdAndChatRoomId(Long userId, Long chatRoomId);
}
