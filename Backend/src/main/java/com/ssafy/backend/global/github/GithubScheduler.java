package com.ssafy.backend.global.github;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ssafy.backend.domain.analyze.service.StatisticService;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.user.service.ChallengeService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GithubScheduler {

	private final ChatRoomRepository chatRoomRepository;
	private final StatisticService statisticService;
	private final ChallengeService challengeService;
	private final GithubApi githubApi;

	@Scheduled(cron = "0 * * * * ?")
	public void countCommitHistory() throws IOException {
		System.out.println("커밋 히스토리 가져오기 실행");
		LocalDate today = LocalDate.now();
		List<ChatRoom> chatRooms = chatRoomRepository.findByDate(today);

		for (ChatRoom chatRoom : chatRooms) {
			Long morningCommitCount = 0L;
			Long afternoonCommitCount = 0L;
			Long nightCommitCount = 0L;

			Map<String, List<Date>> commitDatesSince = githubApi.getCommitDatesSince(chatRoom.getGitRepository(), chatRoom.getBranch(), chatRoom.getGitAccessToken());

			// ksi2564 : [커밋한 시간1, 커밋한 시간2]...
			for (String githubId : commitDatesSince.keySet()) {
				Map<String, Long> counts = commitDatesSince.get(githubId).stream()
						.map(date -> date.toInstant().atZone(ZoneId.systemDefault()).toLocalTime())
						.map(time -> {
							if (!time.isBefore(LocalTime.of(4, 0))
									&& time.isBefore(LocalTime.of(12, 0))) {
								return "morning";
							} else if (!time.isBefore(LocalTime.of(12, 0))
									&& time.isBefore(LocalTime.of(20, 0))) {
								return "afternoon";
							} else {
								return "night";
							}
						})
						.collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

				long myCommitCount = counts.get("morning") + counts.get("afternoon") + counts.get("night");
				// 유저의 도전과제 commit 수 추가 함
				challengeService.updateMyCommit(Long.valueOf(githubId), myCommitCount);

				morningCommitCount += counts.get("morning");
				afternoonCommitCount += counts.get("afternoon");
				nightCommitCount += counts.get("night");
			}

			// 프로젝트 관련 통계에 업데이트하기
			statisticService.updateCommitCount(chatRoom.getId(), morningCommitCount, afternoonCommitCount,
					nightCommitCount);
		}

	}
}
