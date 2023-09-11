package com.ssafy.backend.domain.chat.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
import com.ssafy.backend.domain.chat.entity.Participation;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.chat.repository.ParticipationRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final ParticipationRepository participationRepository;

	@Transactional
	public void registerMyChatRoom(ChatRoomInfo chatRoomInfo) {
		ChatRoom chatRoom = ChatRoom.builder()
				.name(chatRoomInfo.getName())
				.teamName(chatRoomInfo.getTeamName())
				.topic(chatRoomInfo.getTopic())
				.description(chatRoomInfo.getDescription())
				.gitRepository(chatRoomInfo.getGitRepository())
				.startDate(chatRoomInfo.getStartDate())
				.endDate(chatRoomInfo.getEndDate()).build();

		ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

		// 내가 프로젝트에 참여했다
		Participation participation = Participation.builder()
				.user(null)
				.chatRoom(savedChatRoom)
				.build();

		participationRepository.save(participation);
	}
}
