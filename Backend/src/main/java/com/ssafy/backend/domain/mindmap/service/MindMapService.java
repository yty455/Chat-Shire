package com.ssafy.backend.domain.mindmap.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
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
        List<MindMapNodeInfo> mindMapNodeInfos = mindMapRepository.findByChatRoomId(chatRoomId).stream()
                .map(chatroom -> MindMapNodeInfo.builder()
                        .id(chatroom.getNodeId() == 0 ? "root" : String.valueOf(chatroom.getNodeId()))
                        .position(MindMapNodeInfo.Position.builder().x(chatroom.getX()).y(chatroom.getY()).build())
                        .data(MindMapNodeInfo.Data.builder().label(chatroom.getContent()).build())
                        .parentNode(chatroom.getNodeId() == 0 ? null : chatroom.getParentId() == 0 ? "root" : String.valueOf(chatroom.getParentId()))
                        .build()).
                collect(Collectors.toList());

        if (mindMapNodeInfos.isEmpty()) {
            mindMapNodeInfos.add(MindMapNodeInfo.builder()
                    .id("root")
                    .data(MindMapNodeInfo.Data.builder().label("프로젝트").build())
                    .position(MindMapNodeInfo.Position.builder().x((double) 0).y((double) 0).build())
                    .build());
        }
        return mindMapNodeInfos;
    }

    @Transactional
    public void saveMinMap(Long chatRoomId, List<MindMapNodeInfo> mindMapNodes) {
        // chatRoomId로 기존의 mindMap 삭제
        mindMapRepository.deleteByChatRoomId(chatRoomId);

        // mindMapNodes를 모두 mindMap에 저장
        for (MindMapNodeInfo node : mindMapNodes
        ) {
            for (MindMapNodeInfo nodeP : mindMapNodes
                 ) {
                if(Objects.equals(nodeP.getParentNode(), node.getId())){
                    nodeP.setParentNode(String.valueOf(mindMapNodes.indexOf(node)));
                }
            }
            mindMapRepository.save(MindMap.builder()
                    .nodeId(node.getId().equals("root") ? 0 : mindMapNodes.indexOf(node))
                    .x(node.getPosition().getX())
                    .y(node.getPosition().getY())
                    .parentId(node.getId().equals("root") ? null : node.getParentNode() != null ? Integer.parseInt(node.getParentNode()) : null)
                    .content(node.getData().getLabel())
                    .chatRoom(ChatRoom.builder().id(chatRoomId).build())
                    .build()
            );
        }
    }
}

