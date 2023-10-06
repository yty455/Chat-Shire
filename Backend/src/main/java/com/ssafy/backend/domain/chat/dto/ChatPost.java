package com.ssafy.backend.domain.chat.dto;

import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ChatPost {
    private Long chatRoomId;
    private String content;
    private List<AttachedFileInfo> attachedFileInfos;
}
