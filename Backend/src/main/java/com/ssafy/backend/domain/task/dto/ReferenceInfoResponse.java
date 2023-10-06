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
public class ReferenceInfoResponse {
    private Long id;
    private String nickname;
    private String content;
    private Long chatNumber;
    private LocalDateTime chatTime;

    public static ReferenceInfoResponse fromEntity(Reference reference){
        return ReferenceInfoResponse.builder()
                .id(reference.getId())
                .nickname(reference.getNickname())
                .content(reference.getContent())
                .chatNumber(reference.getChatNumber())
                .chatTime(reference.getChatTime()).build();
    }

    public static List<ReferenceInfoResponse> fromEntityList(List<Reference> references){
        return references.stream()
                .map(ReferenceInfoResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
