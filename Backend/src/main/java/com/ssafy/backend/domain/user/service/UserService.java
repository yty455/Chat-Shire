package com.ssafy.backend.domain.user.service;


import com.ssafy.backend.domain.user.MySkill;
import com.ssafy.backend.domain.user.Skill;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.ChallengeInfoResponse;
import com.ssafy.backend.domain.user.dto.MySkillInfo;
import com.ssafy.backend.domain.user.dto.UserInfo;
import com.ssafy.backend.domain.user.dto.UserInfoResponse;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.ChallengeRepository;
import com.ssafy.backend.domain.user.repository.MySkillRepository;
import com.ssafy.backend.domain.user.repository.SkillRepository;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final MySkillRepository mySkillRepository;
    private final ChallengeRepository challengeRepository;


    @Transactional
    public void signUp(UserInfo userInfo) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.update(userInfo);
        findUser.authorizeUser();

        if(userInfo.getMySkill() == null) return;
        // 언어 스킬 등록
        Map<String, Skill> skillMap = skillRepository.findAll().stream()
                .collect(Collectors.toMap(Skill::getSkillName, skill -> skill));

        userInfo.getMySkill().stream()
                .map(skillMap::get)
                .map(skill -> MySkill.builder()
                        .skill(skill)
                        .user(findUser)
                        .build())
                .forEach(mySkillRepository::save);

    }

    public UserInfoResponse getUserProfile() {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);
        List<String> mySkills = mySkillRepository.findByUser(findUser);

        ChallengeInfoResponse challengeInfoResponse = ChallengeInfoResponse.fromEntity(challengeRepository.findByUserId(getUserId()));

        return UserInfoResponse.fromEntity(findUser, mySkills, challengeInfoResponse);
    }

    @Transactional
    public void modifyUserProfile(UserInfo userInfo) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.update(userInfo);

        if (userInfo.getMySkill() == null) return;

        // 언어 스킬 재등록
        Map<String, Skill> skillMap = skillRepository.findAll().stream()
                .collect(Collectors.toMap(Skill::getSkillName, skill -> skill));
        // 내가 등록한 언어 스킬
        List<MySkillInfo> mySkills = mySkillRepository.findByUserId(getUserId());
        // 수정한 언어 목록
        Set<String> modifySkillSet = new HashSet<>(userInfo.getMySkill());

        for (MySkillInfo mySkill : mySkills) {
            if (modifySkillSet.contains(mySkill.getSkillName())) {
                modifySkillSet.remove(mySkill.getSkillName());
            } else {
                mySkillRepository.deleteById(mySkill.getId());
            }
        }

        for (String name : modifySkillSet) {
            mySkillRepository.save(MySkill.builder()
                    .skill(skillMap.get(name))
                    .user(findUser).build());
        }

    }

    @Transactional
    public void withdrawal() {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        // TODO - CASCADE 적용하기

        userRepository.delete(findUser);
    }


}
