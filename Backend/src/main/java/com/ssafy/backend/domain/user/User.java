package com.ssafy.backend.domain.user;


import com.ssafy.backend.domain.common.CreatedAndUpdatedBaseEntity;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "USERS")
public class User extends CreatedAndUpdatedBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private Long id;

    private int socialId;
    private String loginId; // 유니크
    private String nickname;
    private String name;
    private String email;
    private String password;
    private String profileImage;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(length = 500)
    private String refreshToken;


    //== 유저 필드 업데이트 ==//
    public void updateFirst(UserSignUpDto userSignUpDto) {
        this.name = userSignUpDto.getName();
        this.nickname = userSignUpDto.getNickname();
    }

    public void updateProfile(UserDto userDto) {
        this.name = userDto.getName();
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
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", role=" + role +
                ", socialId='" + socialId + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
