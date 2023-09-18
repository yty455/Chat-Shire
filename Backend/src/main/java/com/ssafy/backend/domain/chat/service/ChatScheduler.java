package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.Chat;
import com.ssafy.backend.domain.chat.dto.ChatInfo;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatScheduler {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, ChatInfo> chatRedisTemplate;

    private final String chatNumberKey = "chatNumber";
    private final String chatKey = "chat";

    @Scheduled(cron = "0 * * * * ?")
    public void chatTransfer(){

        System.out.println("채팅 저장 실행");
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
        Map<Long, User> userMap = userRepository.findAll().stream()
                .collect(Collectors.toMap(User::getId, Function.identity()));

        for (ChatRoom chatRoom : chatRoomList){
            List<ChatInfo> chatInfos = chatRedisTemplate.opsForList().range(chatKey+chatRoom.getId(),0,-1);
            if(chatInfos==null) continue;

            List<Chat> chats = chatInfos.stream()
                    .map( chatInfo -> chatInfo.toEntity(userMap.get(chatInfo.getUserId()), chatRoom))
                    .collect(Collectors.toList());

            chatRepository.saveAll(chats);

        }
    }

}
