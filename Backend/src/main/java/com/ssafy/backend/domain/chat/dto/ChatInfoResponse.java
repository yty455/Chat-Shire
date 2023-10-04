package com.ssafy.backend.domain.chat.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatInfoResponse {
    private Long userId;
    private String content;
    private Long chatNumber;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime chatTime;
    private List<AttachedFileInfo> attachedFileInfos;

    public static ChatInfoResponse fromChatInfo(ChatInfo chatInfo, List<AttachedFileInfo> attachedFileInfos) {
        return ChatInfoResponse.builder()
                .userId(chatInfo.getUserId())
                .content(chatInfo.getContent())
                .chatNumber(chatInfo.getChatNumber())
                .chatTime(chatInfo.getChatTime())
                .attachedFileInfos(attachedFileInfos).build();
    }
}
