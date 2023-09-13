package com.ssafy.backend.domain.user.controller;

import static com.ssafy.backend.domain.common.GlobalMethod.*;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.jwt.service.JwtService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final UserRepository userRepository;
	private final JwtService jwtService;

	@Operation(summary = "추가 정보 받아서 회원가입", description = "깃허브 로그인 후 필요한 개인정보를 입력받습니다.")
	@Parameter(name = "userSignDto", description = "회원가입이 추가로 필요한 개인정보 Dto")
	@PostMapping("/users")
	public ResponseEntity<BasicResponse> signUp(@RequestBody UserSignUpDto userSignUpDto) {

		userService.signUp(userSignUpDto);

		BasicResponse basicResponse = BasicResponse.builder()
				.code(HttpStatus.OK.value())
				.httpStatus(HttpStatus.OK)
				.message("회원 가입 성공").build();

		String accessToken = jwtService.createAccessToken(getUserId());
		String refreshToken = jwtService.createRefreshToken();

		// 헤더에 토큰 정보 추가
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Authorization_refresh", "Bearer " + refreshToken);

		jwtService.updateRefreshToken(getUserId(), refreshToken);

		return new ResponseEntity<>(basicResponse, headers, basicResponse.getHttpStatus());
	}

	@Operation(summary = "내 정보 수정", description = "조회된 내 정보를 수정합니다.")
	@Parameter(name = "userDto", description = "내 정보 수정을 위한 Dto")
	@PutMapping("/users")
	public ResponseEntity<BasicResponse> modifyProfile(@RequestBody UserDto userDto) {

		userService.modifyUserProfile(userDto);

		BasicResponse basicResponse = BasicResponse.builder()
				.code(HttpStatus.OK.value())
				.httpStatus(HttpStatus.OK)
				.message("회원 정보 수정 성공")
				.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@GetMapping("/oauth2/sign-up")
	public String signUpForm() {
		return "임시 리다이렉트 페이지";
	}
}