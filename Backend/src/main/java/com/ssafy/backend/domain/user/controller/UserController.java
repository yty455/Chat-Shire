package com.ssafy.backend.domain.user.controller;


import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;


    @GetMapping("/oauth2/sign-up")
    public String signUpForm() {
        return "임시 리다이렉트 페이지";
    }
}