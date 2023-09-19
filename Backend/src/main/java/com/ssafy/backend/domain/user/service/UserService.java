package com.ssafy.backend.domain.user.service;


import static com.ssafy.backend.domain.common.GlobalMethod.*;

import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserInfo;
import com.ssafy.backend.domain.user.dto.UserInfoResponse;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
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
    public void signUp(UserInfo userInfo) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.update(userInfo);
        findUser.authorizeUser();
    }

    public UserInfoResponse getUserProfile() {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        return UserInfoResponse.fromEntity(findUser);
    }

    @Transactional
    public void modifyUserProfile(UserInfo userInfo) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.update(userInfo);
    }

    @Transactional
    public void withdrawal() {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        userRepository.delete(findUser);
    }


}
