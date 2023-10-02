package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.attachedFile.AttachedFile;
import com.ssafy.backend.domain.attachedFile.Category;
import com.ssafy.backend.domain.attachedFile.repository.AttachedFileRepository;
import com.ssafy.backend.domain.chat.dto.ChatInfo;
import com.ssafy.backend.domain.chat.dto.ChatPost;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import com.ssafy.backend.domain.user.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, ChatInfo> chatRedisTemplate;
    private final AttachedFileRepository attachedFileRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChallengeService challengeService;
    private final String chatKey = "chat";

    public void postChat(ChatPost chatPost) {
        Long chatRoomId = chatPost.getChatRoomId();

        // Redis에서 값을 가져옴
        String chatNumberKey = "chatNumber";
        Object chatNumberValue = redisTemplate.opsForValue().get(chatNumberKey + chatRoomId);

        // chatNumberValue가 null인 경우 "0"으로 설정
        String strChatNumber = (chatNumberValue == null) ? "0" : chatNumberValue.toString();

        // 문자열을 Long으로 변환
        Long chatNumber = Long.valueOf(strChatNumber);

        // 첨부파일 검증
        if (chatPost.getAttachedFileInfos() != null) {
            boolean attachFlag = false;
            for (int idx = 0; idx < chatPost.getAttachedFileInfos().size(); idx++) {
                // 카테고리 븐류
                String str = chatPost.getAttachedFileInfos().get(idx).getUrl();
                Category category;
                if (str.endsWith(".jpg") || str.endsWith(".jpeg") || str.endsWith(".png")) {
                    category = Category.IMAGE;
                } else if (str.endsWith(".mp4")) {
                    category = Category.VIDEO;
                } else if (str.endsWith(".pdf") || str.endsWith(".docx") || str.endsWith(".doc")
                        || str.endsWith(".xlsx") || str.endsWith(".xls") || str.endsWith(".txt")) {
                    category = Category.FILE;
                } else continue;
                attachFlag = true;
                // 첨부파일 DB에 저장
                AttachedFile attachedFile = AttachedFile.builder()
                        .url(chatPost.getAttachedFileInfos().get(idx).getUrl())
                        .thumbnail(chatPost.getAttachedFileInfos().get(idx).getThumbnail())
                        .chatRoomId(chatRoomId)
                        .chatNumber(chatNumber)
                        .category(category).build();
                attachedFileRepository.save(attachedFile);
            }

            if(attachFlag){
                challengeService.addLink(getUserId());
            }
        }

        ChatInfo chatInfo = ChatInfo.builder()
                .userId(getUserId())
                .content(chatPost.getContent())
                .chatTime(LocalDateTime.now())
                .chatNumber(chatNumber).build();

        redisTemplate.opsForValue().set(chatNumberKey + chatRoomId, chatNumber + 1L);
        chatRedisTemplate.opsForList().rightPush(chatKey + chatRoomId, chatInfo);

        simpMessagingTemplate.convertAndSend("/topic/greetings", chatInfo);

        // SSE
    }

    public List<ChatInfo> getChats(Long chatRoomId, int page, int size) {
        // sql 먼저 조회
        List<ChatInfo> chatSQL = chatRepository.findInfoByChatRoomId(chatRoomId);
        chatSQL = chatSQL == null ? new ArrayList<>() : chatSQL;
        // redis 조회
        List<ChatInfo> chatRedis = chatRedisTemplate.opsForList().range(chatKey + chatRoomId, 0, -1);
        chatRedis = chatRedis == null ? new ArrayList<>() : chatRedis;
        // 둘이 합쳐서 주기 sql + redis
        // TODO - 페이지네이션
        chatSQL.addAll(chatRedis);
        return chatSQL;
    }
}
