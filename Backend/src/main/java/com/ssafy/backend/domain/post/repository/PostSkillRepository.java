package com.ssafy.backend.domain.post.repository;

import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.post.PostSkill;
import com.ssafy.backend.domain.user.dto.MySkillInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostSkillRepository extends JpaRepository<PostSkill, Long> {
    @Query("select s.skillName from PostSkill ps left join ps.skill s where ps.post.id = :postId")
    List<String> findByPostId(@Param("postId") Long postId);

    @Query("select new com.ssafy.backend.domain.user.dto.MySkillInfo(p.id, s.skillName) from PostSkill p left join Skill s on p.skill = s where p.post.id = :postId")
    List<MySkillInfo> getPostSkill(@Param("postId") Long postId);

    void deleteAllByPostId(Long postId);
    void deleteAllByPost(Post post);
}
