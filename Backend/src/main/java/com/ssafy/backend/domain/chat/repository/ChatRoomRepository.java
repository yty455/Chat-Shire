package com.ssafy.backend.domain.chat.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.backend.domain.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

	@Query("select cr from ChatRoom cr where :today between cr.startDate and cr.endDate")
	List<ChatRoom> findByDate(@Param("today") LocalDate today);
}
