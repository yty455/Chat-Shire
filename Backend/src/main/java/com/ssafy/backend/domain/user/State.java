package com.ssafy.backend.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum State {
    ONLINE, OFFLINE, AWAY, DND
}
