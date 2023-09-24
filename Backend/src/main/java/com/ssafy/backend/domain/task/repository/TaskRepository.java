package com.ssafy.backend.domain.task.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.backend.domain.task.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdAndChatRoomId(Long userId, Long chatroomId);
    List<Task> findByTaskGroupId(Long taskGroupId);

	@Query("select count(*) from Task t where t.chatRoom.id = :chatRoomId")
	Long countByProjectId(@Param("chatRoomId") Long chatRoomId);

}
