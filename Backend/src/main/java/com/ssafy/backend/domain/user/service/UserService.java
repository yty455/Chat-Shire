package com.ssafy.backend.domain.user.service;


import static com.ssafy.backend.domain.common.GlobalMethod.*;

import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
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
    public void signUp(UserSignUpDto userSignUpDto) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.updateFirst(userSignUpDto);
        findUser.authorizeUser();
    }

    public User getUserProfile() {
        return userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    public void modifyUserProfile(UserDto userDto) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.updateProfile(userDto);
    }

    @Transactional
    public void withdrawal() {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        userRepository.delete(findUser);
    }


}
