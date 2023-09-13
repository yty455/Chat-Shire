package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.ChatInfo;
import com.ssafy.backend.domain.chat.dto.ChatPost;
import com.ssafy.backend.domain.chat.dto.ChatResponse;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final RedisTemplate redisTemplate;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final String chatNumberKey = "chatNumber";
    private final String chatKey = "chatNumber";
    public void postChat(ChatPost chatPost){
        Long chatRoomId = chatPost.getChatRoomId();
        // 레디스에서 chatNumber 확인 TODO - 처음 글쓸때 Null체크 해야함
        Long chatNumber = (Long) redisTemplate.opsForValue().get(chatNumberKey+chatRoomId);

        ChatInfo chatInfo = ChatInfo.builder()
                .userId(getUserId())
                .chatRoomId(chatRoomId)
                .content(chatPost.getContent())
                .chatNumber(chatNumber).build();

        redisTemplate.opsForValue().set(chatNumberKey+chatRoomId,chatNumber+1);
        redisTemplate.opsForList().rightPush(chatKey+chatRoomId,chatInfo);

        simpMessagingTemplate.convertAndSend("/topic/greetings", new ChatResponse(chatPost));
    }
}
