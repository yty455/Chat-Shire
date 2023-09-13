package com.ssafy.backend.domain.task.repository;

import com.ssafy.backend.domain.task.Reference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
    List<Reference> findByTaskId(Long taskId);
}
