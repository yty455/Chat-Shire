package com.ssafy.backend.domain.task.repository;

import com.ssafy.backend.domain.task.TaskGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskGroupRepository extends JpaRepository<TaskGroup, Long> {
    List<TaskGroup> findByChatRoomId(Long chatRoomId);
}
