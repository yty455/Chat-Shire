package com.ssafy.backend.domain.post.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.post.dto.PostInfo;
import com.ssafy.backend.domain.post.dto.PostInfoDetailResponse;
import com.ssafy.backend.domain.post.dto.PostInfoResponse;
import com.ssafy.backend.domain.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "에러 게시판 API", description = "에러 게시판 관련 API")
@RestController
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    @Operation(summary = "에러 게시판 조회", description = "해당 프로젝트의 에러 게시판을 조회합니다.")
    @GetMapping("/projects/{projectId}/posts")
    public ResponseEntity<BasicResponse> getPosts(@PathVariable(name = "projectId") Long chatroomId) {

        List<PostInfoResponse> postInfoResponses = postService.getPosts(chatroomId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시판 조회 성공")
                .count(postInfoResponses.size())
                .result(Collections.singletonList(postInfoResponses))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "에러 게시판 상세 조회", description = "에러 게시글을 상세 조회합니다.")
    @GetMapping("/posts/{postId}")
    public ResponseEntity<BasicResponse> getDetailPost(@PathVariable(name = "postId") Long postId) {

        PostInfoDetailResponse postInfoDetailResponse = postService.getDetailPost(postId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시글 상세 조회 성공")
                .count(1)
                .result(Collections.singletonList(postInfoDetailResponse))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "에러 게시판 작성", description = "에러 게시글을 작성합니다.")
    @PostMapping("/projects/{projectId}/posts")
    public ResponseEntity<BasicResponse> registerPost(@PathVariable(name = "projectId") Long chatroomId, @RequestBody PostInfo postInfo) {

        Long postId = postService.registerPost(chatroomId, postInfo);
        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시글 작성 성공")
                .count(1)
                .result(Collections.singletonList(postId))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }


    @Operation(summary = "에러 게시판 수정", description = "에러 게시글을 수정합니다.")
    @PatchMapping("/posts/{postId}")
    public ResponseEntity<BasicResponse> modifyPost(@PathVariable(name = "postId") Long postId, @RequestBody PostInfo postInfo) {

        postService.modifyPost(postId, postInfo);
        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시글 수정 성공")
                .count(1)
                .result(Collections.singletonList(postId))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "에러 게시판 삭제", description = "에러 게시글을 삭제합니다.")
    @PatchMapping("/posts/{postId}")
    public ResponseEntity<BasicResponse> deletePost(@PathVariable(name = "postId") Long postId) {

        postService.deletePost(postId);
        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시글 수정 성공")
                .count(1)
                .result(Collections.singletonList(postId))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }


}
