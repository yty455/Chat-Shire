package com.ssafy.backend.oauth2;


import com.ssafy.backend.domain.user.Role;
import com.ssafy.backend.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

/**
 * 각 소셜에서 받아오는 데이터가 다르므로
 * 소셜별로 데이터를 받는 데이터를 분기 처리하는 DTO 클래스
 */
@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attribute {

    private Map<String, Object> attributes;
    private String attributeKey;
    private String email;
    private String name;

    private int id;

    public static OAuth2Attribute of(String provider, String attributeKey,
                                     Map<String, Object> attributes) {
        switch (provider) {
            case "github":
                return ofGithub("id", attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2Attribute ofGithub(String attributeKey,
                                            Map<String, Object> attributes) {

        Integer id = (Integer) attributes.get("id");
        return OAuth2Attribute.builder()
                .id(id)
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .attributeKey(attributeKey)
                .build();
    }

    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("key", attributeKey);
        map.put("name", name);
        map.put("email", email);
        map.put("id", id);
        return map;
    }
    /**
     * of메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
     * OAuth2UserInfo에서 socialId(식별값), nickname, eamil, gender를 가져와서 build
     * role은 GUEST로 설정
     */

    public User toEntity(OAuth2Attribute oAuth2Attribute) {
        return User.builder()
                .socialId(oAuth2Attribute.getId())
                .email(oAuth2Attribute.getEmail())
                .nickname(oAuth2Attribute.getName())
                .role(Role.GUEST)
                .build();
    }
}
