package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.entity.Distributed;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DistributedRepository extends JpaRepository<Distributed, Long> {
    List<Distributed> findByChatRoomId(Long id);

    @Query("select sum(d.count) from Distributed d join ChatRoom c on d.chatRoom = c join Keyword k on k.chatRoom = c where d.user.id = :userId and d.word = k.word")
    Optional<Integer> findSumOfCountByUserId(@Param("userId") Long userId);

    void deleteAllByUserId(Long userId);
}
