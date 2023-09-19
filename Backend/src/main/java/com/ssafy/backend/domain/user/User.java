package com.ssafy.backend.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.user.dto.UserInfo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.function.Consumer;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "USERS")
public class User extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private Long id;

    private String socialId;
    private String githubId;
    private String nickname;
    private String profileImage;
    private String profileColor;
    private String introduction;
    private String detailIntroduction;

    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(length = 500)
    private String refreshToken;


    //== 유저 필드 업데이트 ==//
    public void update(UserInfo userInfo) {
        updateNickname(userInfo.getNickname());
        updateProfileImage(userInfo.getProfileImage());
        updateProfileColor(userInfo.getProfileColor());
        updateIntroduction(userInfo.getIntroduction());
        updateDetailIntroduction(userInfo.getDetailIntroduction());
    }

    private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
        if (newValue != null) {
            updater.accept(newValue);
        }
    }

    public void updateNickname(String nickname) {
        updateIfNotNull(newValue -> this.nickname = newValue, nickname);
    }

    public void updateProfileImage(String profileImage) {
        updateIfNotNull(newValue -> this.profileImage = newValue, profileImage);
    }

    public void updateProfileColor(String profileColor) {
        updateIfNotNull(newValue -> this.profileColor = newValue, profileColor);
    }

    public void updateIntroduction(String introduction) {
        updateIfNotNull(newValue -> this.introduction = newValue, introduction);
    }

    public void updateDetailIntroduction(String detailIntroduction) {
        updateIfNotNull(newValue -> this.detailIntroduction = newValue, detailIntroduction);
    }

    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", socialId='" + socialId + '\'' +
                ", githubId='" + githubId + '\'' +
                ", nickname='" + nickname + '\'' +
                ", profileImage='" + profileImage + '\'' +
                ", profileColor='" + profileColor + '\'' +
                ", introduction='" + introduction + '\'' +
                ", detailIntroduction='" + detailIntroduction + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
