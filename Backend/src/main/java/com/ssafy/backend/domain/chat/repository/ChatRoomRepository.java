package com.ssafy.backend.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.chat.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

}
