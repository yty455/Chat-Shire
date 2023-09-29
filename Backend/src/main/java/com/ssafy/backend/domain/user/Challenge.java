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
    }

    public void updateCommit(Long commitCount) {
        commit = commitCount;
    }

    public void addChat(int count) {
        chat += count;
    }

    public void addTask() {
        task++;
    }

    public void addError() {
        error++;
    }

    public void addSolution() {
        solution++;
    }

    public void addLink() {
        link++;
    }

    public void addData() {
        data++;
    }

    public void addSnackbar() {
        snackbar++;
    }

    public void addOngoing(int ongoing) {
        this.ongoing = ongoing;
    }

    public void addLogin() {
        login++;
    }

    public void addDone() {
        done++;
    }
}
