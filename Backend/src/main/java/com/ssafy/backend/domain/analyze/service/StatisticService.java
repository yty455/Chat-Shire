package com.ssafy.backend.domain.analyze.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.analyze.Statistic;
import com.ssafy.backend.domain.analyze.repository.StatisticRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticService {

	private final StatisticRepository statisticRepository;

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

}
