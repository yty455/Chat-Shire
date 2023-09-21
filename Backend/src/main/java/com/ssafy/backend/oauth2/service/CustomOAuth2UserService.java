package com.ssafy.backend.oauth2.service;


import com.ssafy.backend.domain.user.Challenge;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.ChallengeRepository;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.oauth2.CustomOAuth2User;
import com.ssafy.backend.oauth2.OAuth2Attribute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");
        //  1번
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        //	2번
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
        String userToken = userRequest.getAccessToken().getTokenType().getValue();
        System.out.println("AccessToken = "+ userRequest.getAccessToken());
        System.out.println("userToken = "+userToken);
        // 유저 email 가져오기위해 access token 사용하기


        //	3번
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        log.info("registrationId = {}", registrationId);
        log.info("userNameAttributeName = {}", userNameAttributeName);
        log.info(String.valueOf(oAuth2User));
        // 4번
        OAuth2Attribute oAuth2Attribute =
                OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Map<String, Object> memberAttribute = oAuth2Attribute.convertToMap();

        User createdUser = getUser(oAuth2Attribute); // getUser() 메소드로 User 객체 생성 후 반환

        // DefaultOAuth2User를 구현한 CustomOAuth2User 객체를 생성해서 반환
        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
                memberAttribute,
                "id",
                createdUser.getSocialId(),
                createdUser.getRole(),
                createdUser.getId()
        );
    }

    /**
     * 만약 찾은 회원이 있다면, 그대로 반환하고 없다면 saveUser()를 호출하여 회원을 저장한다.
     */
    private User getUser(OAuth2Attribute attributes) {
        User findUser = userRepository.findBySocialId(attributes.getId()).orElse(null);

        if (findUser == null) {
            return saveUser(attributes);
        }
        return findUser;
    }

    /**
     * OAuthAttributes의 toEntity() 메소드를 통해 빌더로 User 객체 생성 후 반환
     * 생성된 User 객체를 DB에 저장 : socialType, socialId, email, role 값만 있는 상태
     */
    private User saveUser(OAuth2Attribute attributes) {
        User createdUser = attributes.toEntity(attributes);
        User savedUser = userRepository.save(createdUser);
        challengeRepository.save(Challenge.builder()
                        .user(savedUser).build());
        return savedUser;
    }
}
