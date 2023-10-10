package com.ssafy.backend.domain.post.service;

import com.ssafy.backend.domain.attachedFile.AttachedFile;
import com.ssafy.backend.domain.attachedFile.Category;
import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
import com.ssafy.backend.domain.attachedFile.repository.AttachedFileRepository;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.post.PostSkill;
import com.ssafy.backend.domain.post.dto.PostInfo;
import com.ssafy.backend.domain.post.dto.PostInfoDetailResponse;
import com.ssafy.backend.domain.post.dto.PostInfoResponse;
import com.ssafy.backend.domain.post.repository.PostRepository;
import com.ssafy.backend.domain.post.repository.PostSkillRepository;
import com.ssafy.backend.domain.post.repository.ReplyRepository;
import com.ssafy.backend.domain.user.Skill;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.MySkillInfo;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.SkillRepository;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
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
    private final AttachedFileRepository attachedFileRepository;
    private final ChallengeService challengeService;

    public List<PostInfoResponse> getPosts(Long chatRoomId) {
        List<PostInfoResponse> postInfoResponses = postRepository.getInfoResponseByChatRoomId(chatRoomId);
        for (PostInfoResponse postInfoResponse : postInfoResponses) {
            postInfoResponse.setReplyCount(replyRepository.countByPostId(postInfoResponse.getId()));
            postInfoResponse.setAttachedFileInfos(attachedFileRepository.findInfoByPostId(postInfoResponse.getId()));
            if (postInfoResponse.getReplyCount() != 0)
                postInfoResponse.setReply(replyRepository.findFirstByPostId(postInfoResponse.getId()).getContent());
            postInfoResponse.setSkillName(postSkillRepository.findByPostId(postInfoResponse.getId()));
        }

        return postInfoResponses;
    }

    public PostInfoDetailResponse getDetailPost(Long postId) {
        PostInfoDetailResponse postInfoDetailResponse = postRepository.getInfoById(postId);

        postInfoDetailResponse.setSkillName(postSkillRepository.findByPostId(postId));
        postInfoDetailResponse.setAttachedFileInfos(attachedFileRepository.findInfoByPostId(postId));
        postInfoDetailResponse.setReply(replyRepository.findByPostId(postId));

        return postInfoDetailResponse;
    }

    public Long registerPost(Long chatRoomId, PostInfo postInfo) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Post.getChatRoom", chatRoomId));
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        Post savedPost = postRepository.save(PostInfo.toEntity(findUser, chatRoom, postInfo));

        // 첨부파일 등록 TODO - 채팅, 게시판 작성 코드 중복인데 함수로 빼보기
        if (postInfo.getAttachedFileInfos() != null) {
            for (int idx = 0; idx < postInfo.getAttachedFileInfos().size(); idx++) {

                // 카테고리 븐류
                Category category = findCategory(postInfo.getAttachedFileInfos().get(idx).getUrl());

                // 첨부파일 DB에 저장
                AttachedFile attachedFile = AttachedFile.builder()
                        .url(postInfo.getAttachedFileInfos().get(idx).getUrl())
                        .thumbnail(postInfo.getAttachedFileInfos().get(idx).getThumbnail())
                        .chatRoomId(chatRoomId)
                        .postId(savedPost.getId())
                        .category(category).build();
                attachedFileRepository.save(attachedFile);
            }
        }

        Map<String, Skill> skillMap = skillRepository.findAll().stream()
                .collect(Collectors.toMap(Skill::getSkillName, skill -> skill));
        postInfo.getSkillName().stream()
                .map(skillMap::get)
                .map(skill -> PostSkill.builder()
                        .skill(skill)
                        .post(savedPost).build())
                .forEach(postSkillRepository::save);

        // 도전과제 추가
        challengeService.addError(getUserId());

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
        if (postInfo.getSkillName() != null) {

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

        // 파일 첨부 갱신
        if (postInfo.getAttachedFileInfos() != null) {
            List<AttachedFile> attachedFiles = attachedFileRepository.findByPostId(postId);
            Map<String, AttachedFileInfo> modifyAttachedFiles = new HashMap<>();
            for (AttachedFileInfo attachedFileInfo : postInfo.getAttachedFileInfos()) {
                modifyAttachedFiles.put(attachedFileInfo.getUrl(), attachedFileInfo);
            }

            for (AttachedFile attachedFile : attachedFiles) {
                if (modifyAttachedFiles.containsKey(attachedFile.getUrl())) {
                    modifyAttachedFiles.remove(attachedFile.getUrl());
                } else {
                    attachedFileRepository.deleteById(attachedFile.getId());
                }
            }
            modifyAttachedFiles.keySet().forEach(key -> {
                AttachedFileInfo attachedFileInfo = modifyAttachedFiles.get(key);
                Category category = findCategory(attachedFileInfo.getUrl());
                attachedFileRepository.save(AttachedFile.builder()
                        .postId(postId)
                        .category(category)
                        .url(attachedFileInfo.getUrl())
                        .thumbnail(attachedFileInfo.getThumbnail()).build());
            });
        }

    }


    public void deletePost(Long postId) {
        replyRepository.deleteAllByPostId(postId);
        postSkillRepository.deleteAllByPostId(postId);
        attachedFileRepository.deleteAllByPostId(postId);
        postRepository.deleteById(postId);
    }

    public Category findCategory(String url) {
        Category category = null;
        if (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png")) {
            category = Category.IMAGE;
        } else if (url.endsWith(".mp4")) {
            category = Category.VIDEO;
        } else if (url.endsWith(".pdf") || url.endsWith(".docx") || url.endsWith(".doc")
                || url.endsWith(".xlsx") || url.endsWith(".xls") || url.endsWith(".txt")) {
            category = Category.FILE;
        }

        return category;
    }

    public List<PostInfoResponse> getPostsBySkill(Long chatRoomId, String skillName) {
        List<PostInfoResponse> postInfoResponses = postRepository.findBySkillName(chatRoomId, skillName);
        for (PostInfoResponse postInfoResponse : postInfoResponses) {
            postInfoResponse.setReplyCount(replyRepository.countByPostId(postInfoResponse.getId()));
            postInfoResponse.setAttachedFileInfos(attachedFileRepository.findInfoByPostId(postInfoResponse.getId()));
            if (postInfoResponse.getReplyCount() != 0)
                postInfoResponse.setReply(replyRepository.findFirstByPostId(postInfoResponse.getId()).getContent());
            postInfoResponse.setSkillName(postSkillRepository.findByPostId(postInfoResponse.getId()));
        }
        return postInfoResponses;
    }

    public List<PostInfoResponse> getPostsByContent(Long chatRoomId, String content) {
        List<PostInfoResponse> postInfoResponses = postRepository.findByContent(chatRoomId, content);
        for (PostInfoResponse postInfoResponse : postInfoResponses) {
            postInfoResponse.setReplyCount(replyRepository.countByPostId(postInfoResponse.getId()));
            postInfoResponse.setAttachedFileInfos(attachedFileRepository.findInfoByPostId(postInfoResponse.getId()));
            if (postInfoResponse.getReplyCount() != 0)
                postInfoResponse.setReply(replyRepository.findFirstByPostId(postInfoResponse.getId()).getContent());
            postInfoResponse.setSkillName(postSkillRepository.findByPostId(postInfoResponse.getId()));
        }
        return postInfoResponses;
    }
}
