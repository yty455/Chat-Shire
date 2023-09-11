package com.ssafy.backend.domain.task.repository;

import com.ssafy.backend.domain.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
