package com.ssafy.backend.domain.mindmap.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.mindmap.dto.MindMapNodes;
import com.ssafy.backend.domain.mindmap.repository.MindMapRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MindMapService {
	private final MindMapRepository mindMapRepository;

	public List<MindMapNodes> getMindMap(Long chatRoomId) {
		return mindMapRepository.findByChatRoomId(chatRoomId).stream()
				.map(chatroom -> MindMapNodes.builder()
						.id(chatroom.getId())
						.nodeId(chatroom.getNodeId())
						.x(chatroom.getX())
						.y(chatroom.getY())
						.content(chatroom.getContent()).build()).
				collect(Collectors.toList());
	}
}

