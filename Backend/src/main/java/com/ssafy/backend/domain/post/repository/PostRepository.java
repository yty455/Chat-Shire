package com.ssafy.backend.domain.post.repository;

import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.post.dto.PostInfoDetailResponse;
import com.ssafy.backend.domain.post.dto.PostInfoResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
//    @Query("select new com.ssafy.backend.domain.post.dto.PostInfoResponse(p.id, p.title, p.state, u.profileImage, u.profileColor, (select count(*) from Reply r where r.post.id = p.id), p.createdDate, p.lastModifiedDate) from Post p left join User u on p.user = u where p.chatRoom.id = :chatRoomId ")
    @Query("select new com.ssafy.backend.domain.post.dto.PostInfoResponse(p.id, p.title, p.state, u.profileImage, u.profileColor, p.createdDate, p.lastModifiedDate) from Post p left join User u on p.user = u where p.chatRoom.id = :chatRoomId")
    List<PostInfoResponse> getInfoResponseByChatRoomId(@Param("chatRoomId") Long chatRoomId);

    @Query("select new com.ssafy.backend.domain.post.dto.PostInfoDetailResponse(p.id, p.title, p.content, u.id, u.githubId,u.profileImage, u.profileColor, u.nickname, p.state, p.createdDate, p.lastModifiedDate) from Post p left join User u on p.user = u where p.id = :postId")
    PostInfoDetailResponse getInfoById(@Param("postId") Long postId);

    @Query("SELECT COUNT(p) FROM Post p WHERE p.chatRoom.id = :chatRoomId")
    Long countByChatRoomId(Long chatRoomId);

    @Query("select new com.ssafy.backend.domain.post.dto.PostInfoResponse(p.id, p.title, p.state, u.profileImage, u.profileColor, p.createdDate, p.lastModifiedDate) from Post p left join User u on p.user = u where p.chatRoom.id = :chatRoomId " +
            "and p.id in (select ps.post.id from PostSkill ps  where ps.skill.id in (select s.id from Skill s where s.skillName like CONCAT('%',:skillName,'%')))")
    List<PostInfoResponse> findBySkillName(Long chatRoomId, String skillName);

    @Query("SELECT new com.ssafy.backend.domain.post.dto.PostInfoResponse(p.id, p.title, p.state, u.profileImage, u.profileColor, p.createdDate, p.lastModifiedDate) from Post p left join User u on p.user = u where p.chatRoom.id = :chatRoomId " +
            "and (p.content like CONCAT('%', :content, '%') or p.title like CONCAT('%', :content, '%'))")
    List<PostInfoResponse> findByContent(Long chatRoomId, String content);

    void deleteAllByUserId(Long userId);

    List<Post> findAllByUserId(Long userId);
}
