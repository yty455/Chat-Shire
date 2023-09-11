package com.ssafy.backend.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.chat.entity.Participation;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

}
