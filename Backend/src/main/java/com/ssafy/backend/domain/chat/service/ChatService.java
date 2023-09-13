package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.ChatPost;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    public void postChat(ChatPost chatPost){

    }
}
