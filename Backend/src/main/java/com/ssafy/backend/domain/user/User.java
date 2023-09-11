package com.ssafy.backend.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    private String email;
    private String password;
    private String profileImage;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(length = 500)
    private String refreshToken;


    //== 유저 필드 업데이트 ==//
    public void updateFirst(UserSignUpDto userSignUpDto) {
        this.nickname = userSignUpDto.getNickname();
    }

    public void updateProfile(UserDto userDto) {
        this.nickname = userDto.getNickname();
        this.profileImage = userDto.getProfileImage();
    }

    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
    }

    public void updateNickname(String updateNickname) {
        this.nickname = updateNickname;
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
                ", nickname='" + nickname + '\'' +
                ", githubId='" + githubId + '\'' +
                ", role=" + role +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
