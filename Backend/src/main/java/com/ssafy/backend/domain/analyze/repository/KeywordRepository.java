package com.ssafy.backend.domain.analyze.repository;

import com.ssafy.backend.domain.analyze.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeywordRepository  extends JpaRepository<Keyword, Long> {

    List<Keyword> findByChatRoomId(Long chatRoomId);
}
