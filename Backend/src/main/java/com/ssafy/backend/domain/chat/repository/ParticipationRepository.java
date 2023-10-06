package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.dto.ChatRoomUserInfoResponse;
import com.ssafy.backend.domain.chat.entity.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    List<Participation> findByUserId(Long userId);

    Optional<Participation> findByUserIdAndChatRoomId(Long userId, Long chatRoomId);

    @Query("select new com.ssafy.backend.domain.chat.dto.ChatRoomUserInfoResponse(p.user.id, u.nickname, u.profileImage, u.profileColor) from Participation p left join User u on p.user = u where p.chatRoom.id = :chatRoomId")
    List<ChatRoomUserInfoResponse> findByChatRoomId(@Param("chatRoomId") Long chatRoomId);

    void deleteByUserIdAndChatRoomId(Long userId, Long chatRoomId);

    @Query("select c.endDate from Participation p left join ChatRoom c on p.chatRoom = c where p.user.id = :userId")
    List<LocalDate> findEndDateByUserId(@Param("userId") Long userId);

    void deleteAllByUserId(Long userId);
}
