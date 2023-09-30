package com.ssafy.backend.domain.analyze.repository;

import com.ssafy.backend.domain.analyze.Keyword;
import com.ssafy.backend.domain.analyze.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface KeywordRepository  extends JpaRepository<Keyword, Long> {

    List<Keyword> findByChatRoomId(Long chatRoomId);

    @Modifying
    @Transactional
    @Query("delete from Keyword k where k.chatRoom.id = :chatRoomId and k.word in :words")
    void deleteByChatRoomIdAndWords(Long chatRoomId, List<Word> words);
}
