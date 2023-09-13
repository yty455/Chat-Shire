package com.ssafy.backend.domain.task.repository;

import com.ssafy.backend.domain.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdAndChatRoomId(Long userId, Long chatroomId);
    List<Task> findByTaskGroupId(Long taskGroupId);
}
