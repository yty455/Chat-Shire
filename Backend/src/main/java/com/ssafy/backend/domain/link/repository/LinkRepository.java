package com.ssafy.backend.domain.link.repository;

import com.ssafy.backend.domain.link.Link;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LinkRepository extends JpaRepository<Link, Long> {
    List<Link> findByChatRoomId(Long chatRoomId);
}
