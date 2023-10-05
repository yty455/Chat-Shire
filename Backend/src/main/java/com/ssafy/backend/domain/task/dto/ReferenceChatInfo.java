package com.ssafy.backend.domain.task.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder(toBuilder = true)
public class ReferenceChatInfo {
    private Long chatNumber;
    private Long chatRoomID;

    public ReferenceChatInfo(Long chatNumber, Long chatRoomID) {
        this.chatRoomID = chatRoomID;
        this.chatNumber = chatNumber;
    }
}
