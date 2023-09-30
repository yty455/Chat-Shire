package com.ssafy.backend.domain.analyze.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class KeywordsRequest {
    private List<String> words;
}
