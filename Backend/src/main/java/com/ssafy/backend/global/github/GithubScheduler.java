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
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.ChallengeService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GithubScheduler {

	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final StatisticService statisticService;
	private final ChallengeService challengeService;
	private final GithubApi githubApi;

	@Scheduled(cron = "0 * * * * ?")
	public void countCommitHistory() throws IOException {
		System.out.println("커밋 히스토리 가져오기 실행");
		LocalDate today = LocalDate.now();
		List<ChatRoom> chatRooms = chatRoomRepository.findByDate(today);

		for (ChatRoom chatRoom : chatRooms) {
			if (chatRoom.getGitRepository() == null || chatRoom.getBranch() == null
					|| chatRoom.getGitAccessToken() == null) {
				continue;
			}
			Long morningCommitCount = 0L;
			Long afternoonCommitCount = 0L;
			Long nightCommitCount = 0L;

			System.out.println("chatRoom.getGitRepository() = " + chatRoom.getGitRepository());
			System.out.println("chatRoom.getBranch() = " + chatRoom.getBranch());
			System.out.println("chatRoom.getGitAccessToken() = " + chatRoom.getGitAccessToken());
			Map<String, List<Date>> commitDatesSince = githubApi.getCommitDatesSince(chatRoom.getGitRepository(),
					chatRoom.getBranch(), chatRoom.getGitAccessToken());

			// ksi2564 : [커밋한 시간1, 커밋한 시간2]...
			for (String githubId : commitDatesSince.keySet()) {
				System.out.println(commitDatesSince.get(githubId).size());
				System.out.println(commitDatesSince.get(githubId));
				// Map<String, Long> counts = commitDatesSince.get(githubId).stream()
				// 		.map(date -> date.toInstant().atZone(ZoneId.of("Asia/Seoul")).toLocalTime())
				// 		.map(time -> {
				// 			if (!time.isBefore(LocalTime.of(4, 0))
				// 					&& time.isBefore(LocalTime.of(12, 0))) {
				// 				return "morning";
				// 			} else if (!time.isBefore(LocalTime.of(12, 0))
				// 					&& time.isBefore(LocalTime.of(20, 0))) {
				// 				return "afternoon";
				// 			} else {
				// 				return "night";
				// 			}
				// 		})
				// 		.collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
				Map<String, Long> counts = commitDatesSince.get(githubId).stream()
						.map(date -> {
							LocalTime time = date.toInstant().atZone(ZoneId.of("Asia/Seoul")).toLocalTime();
							System.out.println("Converted time: " + time);
							return time;
						})
						.map(time -> {
							String period;
							if (!time.isBefore(LocalTime.of(4, 0)) && time.isBefore(LocalTime.of(12, 0))) {
								period = "morning";
							} else if (!time.isBefore(LocalTime.of(12, 0)) && time.isBefore(LocalTime.of(20, 0))) {
								period = "afternoon";
							} else {
								period = "night";
							}

							System.out.println("Mapped to: " + period);

							return period;
						})
						.collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));


				long myCommitCount =
						counts.getOrDefault("morning", 0L) + counts.getOrDefault("afternoon", 0L) + counts.getOrDefault(
								"night", 0L);
				// 유저의 도전과제 commit 수 추가 함
				User user = userRepository.findByGithubId(githubId)
						.orElseThrow(() -> new ResourceNotFoundException("githubId", githubId));
				challengeService.updateMyCommit(user.getId(), myCommitCount);

				morningCommitCount += counts.getOrDefault("morning", 0L);
				afternoonCommitCount += counts.getOrDefault("afternoon", 0L);
				nightCommitCount += counts.getOrDefault("night", 0L);
			}
			System.out.println("morningCommitCount = " + morningCommitCount);
			System.out.println("afternoonCommitCount = " + afternoonCommitCount);
			System.out.println("nightCommitCount = " + nightCommitCount);

			// 프로젝트 관련 통계에 업데이트하기
			statisticService.updateCommitCount(chatRoom.getId(), morningCommitCount, afternoonCommitCount,
					nightCommitCount);
		}

	}
}
