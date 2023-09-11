package com.ssafy.backend.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.user.Role;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService tokenService;
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        System.out.println("login success handler");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            System.out.println(oAuth2User);
            System.out.println(oAuth2User.getId());
            System.out.println(oAuth2User.getSocialId());
            System.out.println(oAuth2User.getRole());

            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
            if (oAuth2User.getRole() == Role.GUEST) {
//                String accessToken = jwtService.createAccessToken(oAuth2User.getSocialId());
                String accessToken = jwtService.createAccessToken(oAuth2User.getId());
                // String refreshToken = jwtService.createRefreshToken();
                response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
                // response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

                // jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
                // jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);

                response.sendRedirect(
                        "http://localhost:8080/oauth2/sign-up?" + "access_token=Bearer " + accessToken + "&is_user=F"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
                // response.sendRedirect(
                //     "http://43.200.254.50/join"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
                //                User findUser = userRepository.findByEmail(oAuth2User.getEmail())
                //                                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
                //                findUser.authorizeUser();
            } else {
                loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
            }
        } catch (Exception e) {
            throw e;
        }
    }

    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getId());
//        String accessToken = jwtService.createAccessToken(oAuth2User.getSocialId());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);
        response.sendRedirect(
                "http://localhost:8080/oauth2/sign-up?" + "access_token=Bearer " + accessToken + "&refresh_token="
                        + "Bearer " + refreshToken + "&is_user=T");
        jwtService.updateRefreshToken(oAuth2User.getId(), refreshToken);
    }

}
