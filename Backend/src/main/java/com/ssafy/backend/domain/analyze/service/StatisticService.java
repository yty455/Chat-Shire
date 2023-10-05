package com.ssafy.backend.domain.analyze.service;

import com.ssafy.backend.domain.analyze.Statistic;
import com.ssafy.backend.domain.analyze.dto.ProjectStatistic;
import com.ssafy.backend.domain.analyze.repository.StatisticRepository;
import com.ssafy.backend.domain.chat.entity.Distributed;
import com.ssafy.backend.domain.chat.repository.DistributedRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.post.repository.PostRepository;
import com.ssafy.backend.domain.post.repository.ReplyRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticService {

	private final StatisticRepository statisticRepository;
	private final TaskRepository taskRepository;
	private final PostRepository postRepository;
	private final ReplyRepository replyRepository;
	private final DistributedRepository distributedRepository;

	@Transactional
	public void updateCommitCount(Long chatRoomId, Long morningCommitCount, Long afternoonCommitCount,
			Long nightCommitCount) {
		Statistic statistic = statisticRepository.findByChatRoomId(chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Statistic.ChatRoom", chatRoomId));

		statistic.updateCommitCount(morningCommitCount, afternoonCommitCount, nightCommitCount);
	}

	public Statistic getCommitCount(Long chatRoomId) {
		return statisticRepository.findByChatRoomId(chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Statistic.ChatRoom", chatRoomId));
	}

	public ProjectStatistic getStatistic(Long chatRoomId) {
		// 커밋 수 조회
		Statistic commitCount = getCommitCount(chatRoomId);
		// 태스크 수 조회
		Long taskCount = taskRepository.countByChatRoomId(chatRoomId);
		// 에러 게시판 + 댓글 수 합 조회
		Long postCount = postRepository.countByChatRoomId(chatRoomId);
		Long replyCount = replyRepository.countByChatRoomId(chatRoomId);
		// 채팅에서 나온 카테고리 수 조회
        Map<String, Long> categoryCount = distributedRepository.findByChatRoomId(chatRoomId).stream()
                .collect(Collectors.groupingBy(Distributed::getWord, Collectors.summingLong(Distributed::getCount)));

        return ProjectStatistic.toDto(commitCount, taskCount, postCount + replyCount, categoryCount);
	}
}
