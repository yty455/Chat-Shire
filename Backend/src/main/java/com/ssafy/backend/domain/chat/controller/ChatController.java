package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.Greeting;
import com.ssafy.backend.domain.chat.GreetingController;
import com.ssafy.backend.domain.chat.HelloMessage;
import com.ssafy.backend.domain.chat.dto.ChatInfo;
import com.ssafy.backend.domain.chat.dto.ChatPost;
import com.ssafy.backend.domain.chat.dto.ChatResponse;
import com.ssafy.backend.domain.chat.service.ChatService;
import com.ssafy.backend.domain.common.BasicResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import java.util.Collections;
import java.util.List;

@Tag(name = "채팅 API", description = "채팅관련 API 입니다.")
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @Operation(summary = "채팅 작성", description = "채팅을 작성합니다.")
    @PostMapping("/chats")
    public ResponseEntity<BasicResponse> postChat(@RequestBody ChatPost chatPost){
        chatService.postChat(chatPost);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("채팅 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "채팅 불러오기", description = "채팅을 불러 옵니다.")
    @GetMapping("/projects/{projectsId}/chats")
    public ResponseEntity<BasicResponse> getChat(@PathVariable(name = "projectsId") Long chatRoomId,
                                                 @RequestParam @Parameter(name = "page", description = "요청하는 페이지") int page,
                                                 @RequestParam @Parameter(name = "size", description = "가져오려는 채팅 개수") int size){

        List<ChatInfo> chatInfoList = chatService.getChats(chatRoomId, page, size);

        BasicResponse basicResponse = BasicResponse.builder()
                .count(chatInfoList.size())
                .result(Collections.singletonList(chatInfoList))
                .message("채팅 조회 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
