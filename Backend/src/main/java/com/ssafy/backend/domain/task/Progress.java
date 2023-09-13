package com.ssafy.backend.domain.task;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Progress {
    DONE("PROGRESS_DONE"), ONGOING("PROGRESS_ONGOING");

    private final String key;
}
