package com.ssafy.backend.domain.analyze.dto;

import com.ssafy.backend.domain.analyze.Statistic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class ProjectStatistic {
	private Long morningCommit;
	private Long afternoonCommit;
	private Long nightCommit;
	private Long issueCount;
	private Map<String, Long> allCategoryCount;
	private Long taskCount;

	public static ProjectStatistic toDto(Statistic statistic, Long taskCount, Long issueCount, Map<String, Long> categoryCount) {
		return ProjectStatistic.builder()
				.morningCommit(statistic.getMorningCommit())
				.afternoonCommit(statistic.getAfternoonCommit())
				.nightCommit(statistic.getNightCommit())
				.issueCount(issueCount)
				.allCategoryCount(categoryCount)
				.taskCount(taskCount)
				.build();
	}
}
