package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.ChatInfo;
import com.ssafy.backend.domain.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("select new com.ssafy.backend.domain.chat.dto.ChatInfo(c.user.id, c.content, c.chatNumber, c.chatTime, c.isAttached) from Chat c where c.chatRoom.id = :chatRoomId ")
    List<ChatInfo> findInfoByChatRoomId(@Param("chatRoomId") Long chatRoomId);

    void deleteAllByUserId(Long userId);
}
