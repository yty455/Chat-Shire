package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.user.Skill;
import com.ssafy.backend.domain.user.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SkillService {

    private static SkillRepository skillRepository;

    public List<Skill> getSkills() {
        return skillRepository.findAll();
    }


}
