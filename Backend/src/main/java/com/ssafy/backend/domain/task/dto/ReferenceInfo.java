package com.ssafy.backend.domain.task.dto;

import com.ssafy.backend.domain.task.Reference;
import com.ssafy.backend.domain.task.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class ReferenceInfo {
    private String nickname;
    private String content;
    private Long chatNumber;
    private LocalDateTime chatTime;

    public Reference toEntity(Task task){
        return Reference.builder()
                .nickname(this.getNickname())
                .content(this.getContent())
                .chatNumber(this.getChatNumber())
                .chatTime(this.getChatTime())
                .task(task).build();
    }

    public static ReferenceInfo fromEntity(Reference reference){
        return ReferenceInfo.builder()
                .nickname(reference.getNickname())
                .content(reference.getContent())
                .chatNumber(reference.getChatNumber())
                .chatTime(reference.getChatTime()).build();
    }

    public static List<ReferenceInfo> fromEntityList(List<Reference> references){
        return references.stream()
                .map(ReferenceInfo::fromEntity)
                .collect(Collectors.toList());
    }
}
