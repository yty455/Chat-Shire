package com.ssafy.backend.domain.post.service;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.post.PostSkill;
import com.ssafy.backend.domain.post.dto.PostInfo;
import com.ssafy.backend.domain.post.dto.PostInfoDetailResponse;
import com.ssafy.backend.domain.post.dto.PostInfoResponse;
import com.ssafy.backend.domain.post.dto.ReplyInfoResponse;
import com.ssafy.backend.domain.post.repository.PostRepository;
import com.ssafy.backend.domain.post.repository.PostSkillRepository;
import com.ssafy.backend.domain.post.repository.ReplyRepository;
import com.ssafy.backend.domain.user.Skill;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.MySkillInfo;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.SkillRepository;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final PostRepository postRepository;
    private final ReplyRepository replyRepository;
    private final PostSkillRepository postSkillRepository;
    private final SkillRepository skillRepository;

    public List<PostInfoResponse> getPosts(Long chatRoomId) {
        List<PostInfoResponse> postInfoResponses = postRepository.getInfoResponseByChatRoomId(chatRoomId);
        for (PostInfoResponse postInfoResponse : postInfoResponses) {
            postInfoResponse.setReplyCount(replyRepository.countByPostId(postInfoResponse.getId()));
            postInfoResponse.setReply(replyRepository.findFirstByPostId(postInfoResponse.getId()).getContent());
            postInfoResponse.setSkillName(postSkillRepository.findByPostId(postInfoResponse.getId()));
        }

        return postInfoResponses;
    }
    
    public PostInfoDetailResponse getDetailPost(Long postId){
        PostInfoDetailResponse postInfoDetailResponse = postRepository.getInfoById(postId);
        List<String> skillName = postSkillRepository.findByPostId(postId);
        postInfoDetailResponse.setSkillName(skillName);
        List<ReplyInfoResponse> replyInfoResponses = replyRepository.findByPostId(postId);
        postInfoDetailResponse.setReply(replyInfoResponses);
        return postInfoDetailResponse;
    }

    public Long registerPost(Long chatRoomId, PostInfo postInfo) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Post.getChatRoom", chatRoomId));
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        Post savedPost = postRepository.save(PostInfo.toEntity(findUser, chatRoom, postInfo));

        Map<String, Skill> skillMap = skillRepository.findAll().stream()
                .collect(Collectors.toMap(Skill::getSkillName, skill -> skill));
        postInfo.getSkillName().stream()
                .map(skillMap::get)
                .map(skill -> PostSkill.builder()
                        .skill(skill)
                        .post(savedPost).build())
                .forEach(postSkillRepository::save);

        return savedPost.getId();
    }

    public void modifyPost(Long postId, PostInfo postInfo) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post.modifyPost", postId));
        post.update(postInfo);

        // 언어 스킬 재등록
        Map<String, Skill> skillMap = skillRepository.findAll().stream()
                .collect(Collectors.toMap(Skill::getSkillName, skill -> skill));
        // 내가 등록한 언어 스킬
        List<MySkillInfo> mySkills = postSkillRepository.getPostSkill(postId);
        // 수정한 언어 목록
        Set<String> modifySkillSet = new HashSet<>(postInfo.getSkillName());

        for (MySkillInfo mySkill : mySkills) {
            if (modifySkillSet.contains(mySkill.getSkillName())) {
                modifySkillSet.remove(mySkill.getSkillName());
            } else {
                postSkillRepository.deleteById(mySkill.getId());
            }
        }

        for (String name : modifySkillSet) {
            postSkillRepository.save(PostSkill.builder()
                    .skill(skillMap.get(name))
                    .post(post).build());
        }
    }


    public void deletePost(Long postId) {
        replyRepository.deleteAllByPostId(postId);
        postSkillRepository.deleteAllByPostId(postId);
        postRepository.deleteById(postId);
    }

}
