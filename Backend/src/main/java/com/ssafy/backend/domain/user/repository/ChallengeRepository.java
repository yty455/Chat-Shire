package com.ssafy.backend.domain.user.repository;

import com.ssafy.backend.domain.user.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    Challenge findByUserId(Long userId);
}
