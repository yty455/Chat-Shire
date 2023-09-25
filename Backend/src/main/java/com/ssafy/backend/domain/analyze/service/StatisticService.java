package com.ssafy.backend.domain.analyze.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.analyze.Statistic;
import com.ssafy.backend.domain.analyze.dto.ProjectStatistic;
import com.ssafy.backend.domain.analyze.repository.StatisticRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.post.repository.PostRepository;
import com.ssafy.backend.domain.post.repository.ReplyRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticService {

	private final StatisticRepository statisticRepository;
	private final TaskRepository taskRepository;
	private final PostRepository postRepository;
	private final ReplyRepository replyRepository;

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
		// TODO: 채팅에서 나온 카테고리 수 조회
		// TODO: 주제 관련 카테고리 수 조회

		return ProjectStatistic.toDto(commitCount, taskCount, postCount + replyCount);
	}
}
