package com.ssafy.backend.domain.user.repository;

import com.ssafy.backend.domain.user.MySkill;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.MySkillInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MySkillRepository extends JpaRepository<MySkill, Long> {
    @Query("select s.skillName from MySkill m left join Skill s on m.skill = s where m.user = :user")
    List<String> findByUser(@Param("user") User user);

    @Query("select new com.ssafy.backend.domain.user.dto.MySkillInfo(m.id, s.skillName) from MySkill m left join Skill s on m.skill = s where m.user.id = :userId")
    List<MySkillInfo> findByUserId(@Param("userId") Long userId);
}
