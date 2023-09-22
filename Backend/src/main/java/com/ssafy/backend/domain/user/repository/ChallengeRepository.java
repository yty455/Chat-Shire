package com.ssafy.backend.domain.user.repository;

import java.util.Optional;

import com.ssafy.backend.domain.user.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    Challenge findByUserId(Long userId);

    @Query("select c from Challenge c join fetch c.user where c.user.githubId = :githubId")
    Optional<Challenge> findByUserGithubId(@Param("githubId") String githubId);
}
