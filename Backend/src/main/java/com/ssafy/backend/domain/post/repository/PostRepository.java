package com.ssafy.backend.domain.post.repository;

import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.post.dto.PostInfoDetailResponse;
import com.ssafy.backend.domain.post.dto.PostInfoResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select new com.ssafy.backend.domain.post.dto.PostInfoResponse(p.id, p.title, p.state, u.profileImage, u.profileColor, (select count(*) from Reply where Reply.post = Post), p.createdDate, p.lastModifiedDate) from Post p left join User u on p.user = u where p.chatRoom.id = :chatRoomId")
    List<PostInfoResponse> findAllByChatRoomId(@Param("chatRoomId") Long chatRoomId);

    @Query("select new com.ssafy.backend.domain.post.dto.PostInfoDetailResponse(p.id, p.title, p.content, (select s.skillName from PostSkill ps left join ps.skill s where ps.post.id = :postId), u.id, u.githubId,u.profileImage, u.profileColor, u.nickname, p.state) from Post p left join User u on p.user = u where p.id = :postId")
    PostInfoDetailResponse findInfoById(@Param("postId") Long postId);


}
