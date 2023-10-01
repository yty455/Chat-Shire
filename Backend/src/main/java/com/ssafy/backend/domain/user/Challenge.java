package com.ssafy.backend.domain.user;

import com.ssafy.backend.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Challenge extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "CHALLENGE_ID")
    private Long id;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    // TODO - 각 항목 카운트 하는 코드 추가하러가기

    @Builder.Default()
    private int project = 0;    // 프로젝트 수
    @Builder.Default()
    private long commit = 0;     // 커밋 수
    @Builder.Default()
    private int chat = 0;       // 채팅 수
    @Builder.Default()
    private int task = 0;       // 태스크 수
    @Builder.Default()
    private int error = 0;      // 에러게시판 글 작성
    @Builder.Default()
    private int solution = 0;   // 에러 해결
    @Builder.Default()
    private int link = 0;       // 링크 공유
    @Builder.Default()
    private int data = 0;       // 자료 공유
    @Builder.Default()
    private int snackbar = 0;   // 스낵바 알림
    @Builder.Default()
    private int ongoing = 0;    // 동시에 진행한 프로젝트
    @Builder.Default()
    private int login = 0;      // 최장연속 접속
    @Builder.Default()
    private int done = 0;       // 도전과제 달성

    public void addProject() {
        project++;
        if (project == 5 || project == 10 || project == 25) done++;
    }

    public void updateCommit(Long commitCount) {
        commit = commitCount; // TODO - 수정 필요
        if (commit == 100 || commit == 500 || commit == 1000) done++;
    }

    public void addChat(int count) {
        chat += count;
        if (chat - count < 1000 && chat >= 1000) done++;
        if (chat - count < 5000 && chat >= 5000) done++;
        if (chat - count < 10000 && chat >= 10000) done++;
    }

    public void addTask() {
        task++;
        if (task == 50 || task == 300 || task == 500) done++;
    }

    public void addError() {
        error++;
        if (error == 50 || error == 100 || error == 300) done++;
    }

    public void addSolution() {
        solution++;
        if (solution == 50 || solution == 100 || solution == 150) done++;
    }

    public void addLink() {
        link++;
        if (link == 100 || link == 300 || link == 500) done++;
    }

    public void addData() {
        data++;
        if (data == 50 || data == 100 || data == 500) done++;
    }

    public void addSnackbar() {
        snackbar++;
        if (snackbar == 50 || snackbar == 100 || snackbar == 300) done++;
    }

    public void addOngoing(int ongoing) {
        this.ongoing = ongoing;
        if (ongoing == 3 || ongoing == 5 || ongoing == 7) done++;
    }

    public void addLogin(int login) {
        this.login = login;
        if (login == 7 || login == 30 || login == 365) done++;
    }

}
