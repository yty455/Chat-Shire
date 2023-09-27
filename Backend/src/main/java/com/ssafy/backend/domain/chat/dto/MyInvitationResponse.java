package com.ssafy.backend.domain.chat.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.entity.Notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MyInvitationResponse {
	private Long id;
	private String content;
	private Long chatRoomId;
	private String chatRoomName;
	private String host;

	public static MyInvitationResponse toDto(Notification notification) {
		return MyInvitationResponse.builder()
				.id(notification.getId())
				.content(notification.getContent())
				.chatRoomId(notification.getParticipation().getChatRoom().getId())
				.chatRoomName(notification.getParticipation().getChatRoom().getName())
				.host(notification.getParticipation().getUser().getNickname())
				.build();
	}
}
