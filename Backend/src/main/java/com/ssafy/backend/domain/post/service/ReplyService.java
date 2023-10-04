package com.ssafy.backend.domain.post.service;

import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.post.Reply;
import com.ssafy.backend.domain.post.dto.ReplyInfo;
import com.ssafy.backend.domain.post.repository.PostRepository;
import com.ssafy.backend.domain.post.repository.ReplyRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Service
@Transactional
@RequiredArgsConstructor
public class ReplyService {
    private final ReplyRepository replyRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ChallengeService challengeService;

    public Long registerReply(Long postId, ReplyInfo replyInfo) {

        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        Post findPost = postRepository.findById(postId)
                .orElseThrow();

        // 도전과제 추가 - 남이 작성한 게시글에 댓글 쓸 경우 에러 해결
        if (findPost.getUser().getId() != getUserId()) {
            challengeService.addSolution(getUserId());
        }

        return replyRepository.save(Reply.builder()
                .content(replyInfo.getContent())
                .user(findUser)
                .post(findPost).build()).getId();

    }

    public void modifyReply(Long replyId, ReplyInfo replyInfo) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow();
        reply.update(replyInfo.getContent());
    }

    public void deleteReply(Long replyId) {
        replyRepository.deleteById(replyId);
    }
}
