package com.ssafy.backend.domain.chat.dto;

import java.time.LocalDateTime;

import com.ssafy.backend.domain.chat.entity.AcceptanceStatus;
import com.ssafy.backend.domain.chat.entity.Notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NotificationResponse {
	private Long id;
	private String content;
	private String url;
	private AcceptanceStatus status;
	private LocalDateTime createdAt;

	public static NotificationResponse toDto(Notification notification) {
		return NotificationResponse.builder()
				.id(notification.getId())
				.content(notification.getContent())
				.url(notification.getUrl())
				.status(notification.getStatus())
				.createdAt(notification.getCreatedDate()).build();
	}
}
