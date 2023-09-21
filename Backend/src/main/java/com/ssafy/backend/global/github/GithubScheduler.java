package com.ssafy.backend.global.github;

import java.io.IOException;

import org.springframework.scheduling.annotation.Scheduled;

public class GithubScheduler {

	@Scheduled(cron = "0 0 * * * ?")
	public void countCommitHistory() throws IOException {
		System.out.println("커밋 히스토리 가져오기 실행");

	}
}
