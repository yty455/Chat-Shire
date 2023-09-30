package com.ssafy.backend.domain.analyze.service;

import com.ssafy.backend.domain.analyze.Keyword;
import com.ssafy.backend.domain.analyze.Word;
import com.ssafy.backend.domain.analyze.dto.MyKeywords;
import com.ssafy.backend.domain.analyze.repository.KeywordRepository;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository keywordRepository;
    private final ChatRoomRepository chatRoomRepository;


    public List<MyKeywords> getKeywords(Long chatRoomId) {
        return keywordRepository.findByChatRoomId(chatRoomId).stream()
                .map(keyword -> MyKeywords.toDto(keyword.getWord()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void registerKeywords(Long chatRoomId, List<Word> words) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("ChatRoom", chatRoomId));

        List<Keyword> collect = words.stream()
                .map(word -> Keyword.create(chatRoom, word))
                .collect(Collectors.toList());

        keywordRepository.saveAll(collect);
    }

    @Transactional
    public void deleteKeywords(Long chatRoomId, List<Word> words) {
        keywordRepository.deleteByChatRoomIdAndWords(chatRoomId, words);
    }
}
