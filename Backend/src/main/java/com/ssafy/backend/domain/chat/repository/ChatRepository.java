package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {

}
