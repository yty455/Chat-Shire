package com.ssafy.backend.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.analyze.Statistic;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.user.Challenge;
import com.ssafy.backend.domain.user.repository.ChallengeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChallengeService {
	private final ChallengeRepository challengeRepository;

	@Transactional
	public void updateMyCommit(String githubId, Long commitCount) {
		Challenge challenge = challengeRepository.findByUserGithubId(githubId)
				.orElseThrow(() -> new ResourceNotFoundException("Challenge.user", githubId));

		challenge.updateCommit(commitCount);
	}
}
