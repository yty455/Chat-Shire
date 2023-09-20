package com.ssafy.backend.domain.user.repository;

import com.ssafy.backend.domain.user.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}
