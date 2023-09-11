package com.ssafy.backend.domain.chat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
import com.ssafy.backend.domain.chat.dto.ChatRoomInfoResponse;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.Participation;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.chat.repository.ParticipationRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final ParticipationRepository participationRepository;
	private final UserRepository userRepository;

	public List<ChatRoomInfoResponse> getMyChatRoom() {
		List<ChatRoom> chatRooms = participationRepository.findByUserId(getUserId()).stream()
				.map(Participation::getChatRoom)
				.collect(Collectors.toList());
		return ChatRoomInfoResponse.fromEntityList(chatRooms);
	}

	public ChatRoomInfoResponse getMyChatRoomDetail(Long chatRoomId) {
		ChatRoom chatRoom = participationRepository.findByUserIdAndChatRoomId(getUserId(), chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Participation.getChatRoom", chatRoomId))
				.getChatRoom();

		return ChatRoomInfoResponse.fromEntity(chatRoom);
	}

	@Transactional
	public void registerMyChatRoom(ChatRoomInfo chatRoomInfo) {

		User user = userRepository.findById(getUserId())
				.orElseThrow(UserNotFoundException::new);

		ChatRoom chatRoom = ChatRoom.builder()
				.name(chatRoomInfo.getName())
				.teamName(chatRoomInfo.getTeamName())
				.topic(chatRoomInfo.getTopic())
				.description(chatRoomInfo.getDescription())
				.gitRepository(chatRoomInfo.getGitRepository())
				.startDate(chatRoomInfo.getStartDate())
				.endDate(chatRoomInfo.getEndDate()).build();

		ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

		Participation participation = Participation.builder()
				.user(user)
				.chatRoom(savedChatRoom)
				.build();

		participationRepository.save(participation);
	}

	private static Long getUserId() {
		return Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
	}

	@Transactional
	public void modifyMyChatRoom(ChatRoomInfo chatRoomInfo, Long chatRoomId) {
		ChatRoom chatRoom = participationRepository.findByUserIdAndChatRoomId(getUserId(), chatRoomId)
				.orElseThrow(() -> new ResourceNotFoundException("Participation.getCharRoom", chatRoomId))
				.getChatRoom();

		chatRoom.update(chatRoomInfo);
	}
}
