package com.ssafy.backend.domain.mindmap.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.mindmap.MindMap;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.ManyToOne;
import javax.transaction.Transactional;

public interface MindMapRepository extends JpaRepository<MindMap, Long> {
	List<MindMap> findByChatRoomId(Long chatRoomId);

	@Transactional
	@Modifying
	void deleteByChatRoomId(Long chatRoomId);
}
