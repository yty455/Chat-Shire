package com.ssafy.backend.domain.attachedFile.service;

import com.ssafy.backend.domain.attachedFile.Category;
import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
import com.ssafy.backend.domain.attachedFile.repository.AttachedFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AttachedFileService {


    private final AttachedFileRepository attachedFileRepository;

    public List<AttachedFileInfo> getAttachedFiles(Long chatRoomId, Category category) {
        return attachedFileRepository.findInfoByChatRoomIdAndCategory(chatRoomId, category);
    }
}
