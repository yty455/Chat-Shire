package com.ssafy.backend.domain.task.repository;

import com.ssafy.backend.domain.task.Reference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
}
