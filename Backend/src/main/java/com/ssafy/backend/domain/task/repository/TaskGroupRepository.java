package com.ssafy.backend.domain.task.repository;

import com.ssafy.backend.domain.task.TaskGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskGroupRepository extends JpaRepository<TaskGroup, Long> {
}
