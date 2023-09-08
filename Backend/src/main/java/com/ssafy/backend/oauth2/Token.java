package com.ssafy.backend.oauth2;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@Getter
@Setter
public class Token {
    private String accessToken;
    private String refreshToken;

    public Token(String token, String refreshToken) {
        this.accessToken = token;
        this.refreshToken = refreshToken;
    }
}