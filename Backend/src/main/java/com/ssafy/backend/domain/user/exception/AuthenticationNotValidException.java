package com.ssafy.backend.domain.user.exception;

public class AuthenticationNotValidException extends RuntimeException {
	public AuthenticationNotValidException() {
		super("유저의 인증 정보가 존재하지 않습니다.");
	}
}
