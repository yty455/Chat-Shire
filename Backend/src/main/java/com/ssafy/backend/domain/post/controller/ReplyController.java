package com.ssafy.backend.domain.post.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.post.dto.ReplyInfo;
import com.ssafy.backend.domain.post.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Tag(name = "에러 게시판 댓글 API", description = "에러 게시판 댓글 관련 API")
@RestController
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;
    @Operation(summary = "에러 게시판 댓글 작성", description = "에러 게시판 댓글을 작성합니다.")
    @PostMapping("/posts/{postId}/replies")
    public ResponseEntity<BasicResponse> registerReply(@PathVariable(name = "postId") Long postId, @RequestBody ReplyInfo replyInfo) {

        Long replyId =replyService.registerReply(postId, replyInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시글 댓글 작성 성공")
                .count(1)
                .result(Collections.singletonList(replyId))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "에러 게시판 댓글 수정", description = "작성된 댓글을 수정합니다.")
    @PutMapping("/replies/{replyId}")
    public ResponseEntity<BasicResponse> modifyReply(@PathVariable(name = "replyId") Long replyId, @RequestBody ReplyInfo replyInfo) {

        replyService.modifyReply(replyId, replyInfo);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시글 댓글 수정 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "에러 게시판 댓글 삭제", description = "작성된 댓글을 삭제합니다.")
    @DeleteMapping("/replies/{replyId}")
    public ResponseEntity<BasicResponse> modifyReply(@PathVariable(name = "replyId") Long replyId) {

        replyService.deleteReply(replyId);

        BasicResponse basicResponse = BasicResponse.builder()
                .message("에러 게시글 댓글 삭제 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
