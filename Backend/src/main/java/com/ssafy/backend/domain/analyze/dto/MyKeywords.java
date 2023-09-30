package com.ssafy.backend.domain.analyze.dto;

import com.ssafy.backend.domain.analyze.Word;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MyKeywords {

    private Word word;

    public static MyKeywords toDto(Word word) {
        return MyKeywords.builder()
                .word(word)
                .build();
    }
}
