package com.ssafy.backend.domain.analyze.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MyKeywords {

    private String word;

    public static MyKeywords toDto(String word) {
        return MyKeywords.builder()
                .word(word)
                .build();
    }
}
