package com.ssafy.backend.domain.mindmap.service;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.backend.domain.mindmap.MindMap;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.mindmap.dto.MindMapNodeInfo;
import com.ssafy.backend.domain.mindmap.repository.MindMapRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MindMapService {
	private final MindMapRepository mindMapRepository;

	public List<MindMapNodeInfo> getMindMap(Long chatRoomId) {
		return mindMapRepository.findByChatRoomId(chatRoomId).stream()
				.map(chatroom -> MindMapNodeInfo.builder()
						.mindMapId(chatroom.getId())
						.id(chatroom.getNodeId())
						.position(MindMapNodeInfo.Position.builder().x(chatroom.getX()).y(chatroom.getY()).build())
						.data(MindMapNodeInfo.Data.builder().label(chatroom.getContent()).build()).build()).
				collect(Collectors.toList());
	}

//	@Transactional
//	public void saveMinMap(Long chatRoomId, List<MindMapNodeInfo> mindMapNodes) {
//		// chatRoomId로 기존의 mindMap 삭제
//		mindMapRepository.deleteByChatRoomId(chatRoomId);
//
//		// mindMapNodes를 모두 mindMap에 저장
//		for (MindMapNodeInfo node: mindMapNodes
//			 ) {
//			mindMapRepository.save(MindMap.builder()
//					.id(node.getId())
//					.
//					)
//		}
//	}
}

