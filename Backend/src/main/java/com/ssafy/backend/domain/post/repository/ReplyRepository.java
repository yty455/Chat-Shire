package com.ssafy.backend.domain.post.repository;

import com.ssafy.backend.domain.post.Reply;
import com.ssafy.backend.domain.post.dto.ReplyInfoResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    Reply findFirstByPostId(Long postId);

    void deleteAllByPostId(Long postId);

    @Query("select new com.ssafy.backend.domain.post.dto.ReplyInfoResponse(r.id, r.content, u.id, u.nickname, u.githubId, u.profileImage, u.profileColor, r.createdDate, r.lastModifiedDate) from Reply r left join r.user u where r.post.id = :postId")
    List<ReplyInfoResponse> findByPostId(Long postId);
}
