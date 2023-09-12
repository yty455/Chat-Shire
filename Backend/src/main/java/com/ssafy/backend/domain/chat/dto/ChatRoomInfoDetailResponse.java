package com.ssafy.backend.domain.chat.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.ssafy.backend.domain.chat.entity.ChatRoom;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatRoomInfoDetailResponse {
	private Long id;
	private String name;
	private String teamName;
	private String topic; // FIXME: 카테고리 정해지면 enum 타입도 고려
	private String description;
	private String gitRepository;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;
	private String notification;

	public static ChatRoomInfoDetailResponse toDto(ChatRoom chatRoom, String content) {
		return ChatRoomInfoDetailResponse.builder()
				.id(chatRoom.getId())
				.name(chatRoom.getName())
				.teamName(chatRoom.getTeamName())
				.topic(chatRoom.getTopic())
				.description(chatRoom.getDescription())
				.gitRepository(chatRoom.getGitRepository())
				.startDate(chatRoom.getStartDate())
				.endDate(chatRoom.getEndDate())
				.notification(content)
				.build();
	}
}
