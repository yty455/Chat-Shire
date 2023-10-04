package com.ssafy.backend.domain.user.dto;

import com.ssafy.backend.domain.user.Challenge;
import com.ssafy.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class UserInfoResponse {

    private String socialId;
    private String githubId;
    private String nickname;
    private String profileImage;
    private String profileColor;
    private String introduction;
    private String detailIntroduction;
    private String position;

    private List<String> mySkill;

    private ChallengeInfoResponse challengeInfoResponse;

    private String state;

    // 커밋 수
    private long morningCommit;
    private long afternoonCommit;
    private long nightCommit;

    private int errorCount; // 디버깅 의지(에러 게시글 수 + 댓글 수)
    private int chatCount;  // 분위기 메이커(총 채팅 수)
    private int topicCount; // 협업 의지(주제 관련 채팅 수)
    private int taskCount;  // 일정 관리(태스크 개수)

    public void setDayCommit(Challenge challenge) {
        morningCommit = challenge.getMorningCommit();
        afternoonCommit = challenge.getAfternoonCommit();
        nightCommit = challenge.getNightCommit();
    }

    public void setCount(int error, int chat, int topic, int task) {
        errorCount = error;
        chatCount = chat;
        topicCount = topic;
        taskCount = task;
    }

    public static UserInfoResponse fromEntity(User user, List<String> mySkill, ChallengeInfoResponse challengeInfoResponse, String state) {
        return UserInfoResponse.builder()
                .socialId(user.getSocialId())
                .githubId(user.getGithubId())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .profileColor(user.getProfileColor())
                .introduction(user.getIntroduction())
                .detailIntroduction(user.getDetailIntroduction())
                .position(user.getPosition())
                .mySkill(mySkill)
                .challengeInfoResponse(challengeInfoResponse)
                .state(state)
                .build();
    }

}
