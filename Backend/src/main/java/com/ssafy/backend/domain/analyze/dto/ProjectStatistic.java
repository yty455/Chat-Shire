package com.ssafy.backend.domain.analyze.dto;

import com.ssafy.backend.domain.analyze.Statistic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class ProjectStatistic {
	private Long morningCommit;
	private Long afternoonCommit;
	private Long nightCommit;
	private Long issueCount;
	private Long allCategoryCount;
	private Long topicCategoryCount;
	private Long taskCount;

	public static ProjectStatistic toDto(Statistic statistic, Long taskCount, Long issueCount) {
		return ProjectStatistic.builder()
				.morningCommit(statistic.getMorningCommit())
				.afternoonCommit(statistic.getAfternoonCommit())
				.nightCommit(statistic.getNightCommit())
				.issueCount(issueCount)
				.allCategoryCount(0L)
				.topicCategoryCount(0L)
				.taskCount(taskCount)
				.build();
	}
}
