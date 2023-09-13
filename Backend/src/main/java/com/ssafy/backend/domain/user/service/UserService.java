package com.ssafy.backend.domain.user.service;


import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void signUp(UserSignUpDto userSignUpDto, String githubId) {
        User findUser = userRepository.findByGithubId(githubId)
                .orElseThrow(() -> new IllegalArgumentException("깃허브 아이디에 해당하는 유저가 없습니다."));

        findUser.updateFirst(userSignUpDto);
        findUser.authorizeUser();

    }

    public User getUserProfile(String githubId) {
        return userRepository.findByGithubId(githubId)
                .orElseThrow(() -> new IllegalArgumentException("깃허브 아이디에 해당하는 유저가 없습니다."));
    }

    @Transactional
    public void modifyUserProfile(UserDto userDto, String githubId) {
        User findUser = userRepository.findByGithubId(githubId)
                .orElseThrow(() -> new IllegalArgumentException("깃허브 아이디에 해당하는 유저가 없습니다."));

        findUser.updateProfile(userDto);
    }

    @Transactional
    public void withdrawal(String githubId) {
        User findUser = userRepository.findByGithubId(githubId)
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        userRepository.delete(findUser);
    }


}
