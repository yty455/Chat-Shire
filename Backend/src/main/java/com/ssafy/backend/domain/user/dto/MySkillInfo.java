package com.ssafy.backend.domain.user.dto;

import lombok.Getter;

@Getter
public class MySkillInfo {
    private Long id;
    private String skillName;

    public MySkillInfo(Long id, String skillName) {
        this.id = id;
        this.skillName = skillName;
    }
}
