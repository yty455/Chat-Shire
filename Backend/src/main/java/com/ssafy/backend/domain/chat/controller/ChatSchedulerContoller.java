package com.ssafy.backend.domain.chat.controller;

import com.ssafy.backend.domain.chat.service.ChatScheduler;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor

public class ChatSchedulerContoller {
    final private ChatScheduler chatScheduler;

    @RequestMapping("distributed")
    public String distributed() throws IOException {
        chatScheduler.chatTransfer();
        chatScheduler.sparkStart();
        return "test 결과는";
    }

}
