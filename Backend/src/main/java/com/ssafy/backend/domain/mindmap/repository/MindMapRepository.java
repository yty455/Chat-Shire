package com.ssafy.backend.domain.mindmap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.mindmap.MindMap;

public interface MindMapRepository extends JpaRepository<MindMap, Long> {
	List<MindMap> findByChatRoomId(Long chatRoomId);

	void deleteByChatRoomId(Long chatRoomId);
}
