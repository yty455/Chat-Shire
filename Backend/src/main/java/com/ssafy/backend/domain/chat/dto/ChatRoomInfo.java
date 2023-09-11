package com.ssafy.backend.domain.chat.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;

@Getter
public class ChatRoomInfo {
	private String name;
	private String teamName;
	private String topic; // FIXME: 카테고리 정해지면 enum 타입도 고려
	private String description;
	private String gitRepository;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate startDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate endDate;
}
