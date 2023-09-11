package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.Greeting;
import com.ssafy.backend.domain.chat.GreetingController;
import com.ssafy.backend.domain.chat.HelloMessage;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.Collections;

@Tag(name = "채팅 API", description = "채팅관련 API 입니다.")
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final GreetingController greetingController;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Operation(summary = "채팅 작성", description = "채팅을 작성합니다.")
    @Parameter(name = "ChatPost", description = "dto에 해당하는 정보를 넘겨주세요.")
    @PostMapping("/chat")
    public ResponseEntity<BasicResponse> postChat(@RequestBody ChatPost chatPost) throws Exception {
        chatService.postChat(chatPost);
        System.out.println(chatPost.getContent());
//        Greeting greeting = greetingController.greeting2(chatPost.getContent());


        simpMessagingTemplate.convertAndSend("/topic/greetings", new ChatResponse(chatPost));
        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("채팅 등록 성공")
                .count(1)
                .result(Collections.singletonList(1))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @SendTo("/topic/greetings")
    public Greeting greeting(String message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message) + "!");
    }

}
