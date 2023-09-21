package com.ssafy.backend.domain.user.dto;

import com.ssafy.backend.domain.user.Challenge;
import lombok.Builder;

@Builder
public class ChallengeInfoResponse {
    private int project;    // 프로젝트 수
    private int commit;     // 커밋 수
    private int chat;       // 채팅 수
    private int task;       // 태스크 수
    private int error;      // 에러게시판 글 작성
    private int solution;   // 에러 해결
    private int link;       // 링크 공유
    private int data;       // 자료 공유
    private int snackbar;   // 스낵바 알림
    private int ongoing;    // 동시에 진행한 프로젝트
    private int login;      // 최장연속 접속
    private int done;       // 도전과제 달성

    public static ChallengeInfoResponse fromEntity(Challenge challenge){
        return ChallengeInfoResponse.builder()
                .project(challenge.getProject())
                .commit(challenge.getCommit())
                .chat(challenge.getChat())
                .task(challenge.getTask())
                .error(challenge.getError())
                .solution(challenge.getSolution())
                .link(challenge.getLink())
                .data(challenge.getData())
                .snackbar(challenge.getSnackbar())
                .ongoing(challenge.getOngoing())
                .login(challenge.getLogin())
                .done(challenge.getDone()).build();
    }
}
