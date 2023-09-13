package com.ssafy.backend.domain.task;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Priority {
    HIGH("PRIORITY_HIGH"), MEDIUM("PRIORITY_MEDIUM"), LOW("PRIORITY_LOW");

    private final String key;
}
