package com.ssafy.backend.domain.chat.entity;

import static javax.persistence.FetchType.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder(toBuilder = true)
@Entity
public class Notice {

	@Id
	@GeneratedValue
	@Column(name = "NOTICE_ID")
	private Long id;

	private String content;

	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "CHATROOM_ID")
	private ChatRoom chatRoom;

	public void update(String content) {
		this.content = content;
	}

	public static Notice create(ChatRoom chatRoom) {
		return Notice.builder()
				.content("")
				.chatRoom(chatRoom)
				.build();
	}
}
