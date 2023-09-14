package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.dto.ChatInfo;
import com.ssafy.backend.domain.chat.dto.ChatPost;
import com.ssafy.backend.domain.chat.dto.ChatResponse;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;
import static java.lang.String.valueOf;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, ChatInfo> chatRedisTemplate;

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final String chatNumberKey = "chatNumber";
    private final String chatKey = "chat";

    public void postChat(ChatPost chatPost) {
        Long chatRoomId = chatPost.getChatRoomId();

        // Redis에서 값을 가져옴
        Object chatNumberValue = redisTemplate.opsForValue().get(chatNumberKey + chatRoomId);

        // chatNumberValue가 null인 경우 "0"으로 설정
        String strChatNumber = (chatNumberValue == null) ? "0" : chatNumberValue.toString();

        // 문자열을 Long으로 변환
        Long chatNumber = Long.valueOf(strChatNumber);

        ChatInfo chatInfo = ChatInfo.builder()
                .userId(getUserId())
                .chatRoomId(chatRoomId)
                .content(chatPost.getContent())
                .chatNumber(chatNumber).build();

        redisTemplate.opsForValue().set(chatNumberKey + chatRoomId, chatNumber + 1L);
        chatRedisTemplate.opsForList().rightPush(chatKey + chatRoomId, chatInfo);

        simpMessagingTemplate.convertAndSend("/topic/greetings", chatInfo);

        // SSE
    }

    public List<ChatInfo> getChats(Long chatRoomId, int page, int size){
        List<ChatInfo> chatInfos = chatRedisTemplate.opsForList().range(chatKey+chatRoomId,0,-1);
        return chatInfos;
    }
}
