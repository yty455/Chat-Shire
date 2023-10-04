package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.entity.Distributed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistributedRepository extends JpaRepository<Distributed, Long> {
    List<Distributed> findByChatRoomId(Long id);

    void deleteAllByUserId(Long userId);
}
