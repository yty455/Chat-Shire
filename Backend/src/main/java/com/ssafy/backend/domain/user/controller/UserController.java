package com.ssafy.backend.domain.user.controller;

import static com.ssafy.backend.domain.common.GlobalMethod.*;

import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserInfoResponse;
import com.sun.xml.bind.v2.TODO;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.user.dto.UserInfo;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.jwt.service.JwtService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import java.util.Collections;

@Tag(name = "유저 API", description = "유저 관련 API")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @Operation(summary = "추가 정보 받아서 회원가입", description = "깃허브 로그인 후 필요한 개인정보를 입력받습니다.")
    @PostMapping("/users")
    public ResponseEntity<BasicResponse> signUp(@RequestBody UserInfo userInfo) {

        userService.signUp(userInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("회원 가입 성공")
                .build();

        String accessToken = jwtService.createAccessToken(getUserId());
        String refreshToken = jwtService.createRefreshToken();

        // 헤더에 토큰 정보 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Authorization_refresh", "Bearer " + refreshToken);

        jwtService.updateRefreshToken(getUserId(), refreshToken);

        return new ResponseEntity<>(basicResponse, headers, basicResponse.getHttpStatus());
    }

    // TODO - 회원정보 페이지에서 도전과제, 통계 데이터 같이 주기
    @Operation(summary = "내정보 조회", description = "회원 정보를 조회합니다.")
    @GetMapping("/users")
    public ResponseEntity<BasicResponse> getUserProfile() {

        UserInfoResponse userInfoResponse = userService.getUserProfile();

        BasicResponse basicResponse = BasicResponse.builder()
                .message("내정보 조회 성공")
                .count(1)
                .result(Collections.singletonList(userInfoResponse))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }


    @Operation(summary = "내 정보 수정", description = "내 정보를 수정합니다. ( 변경된 값만 넣어주세요. )")
    @PatchMapping("/users")
    public ResponseEntity<BasicResponse> modifyProfile(@RequestBody UserInfo userInfo) {

        userService.modifyUserProfile(userInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("회원 정보 수정 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "회원 탈퇴", description = "회원 정보를 삭제합니다.")
    @DeleteMapping("/users")
    public ResponseEntity<BasicResponse> withdrawal() {

        userService.withdrawal();

        BasicResponse basicResponse = BasicResponse.builder()
                .message("회원 탈퇴 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @GetMapping("/oauth2/sign-up")
    public String signUpForm() {
        return "임시 리다이렉트 페이지";
    }
}