package com.ssafy.backend.domain.analyze.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.analyze.Statistic;

public interface StatisticRepository extends JpaRepository<Statistic, Long> {
	Optional<Statistic> findByChatRoomId(Long chatRoomId);
}
