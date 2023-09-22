package com.ssafy.backend.domain.post.repository;

import com.ssafy.backend.domain.post.PostSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostSkillRepository extends JpaRepository<PostSkill, Long> {
    @Query("select s.skillName from PostSkill ps left join ps.skill s where ps.post.id = :postId")
    List<String> findByPostId(@Param("postId") Long postId);

    void deleteAllByPostId(Long postId);
}
