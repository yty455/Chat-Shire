package com.ssafy.backend.domain.chat.entity;

import static javax.persistence.FetchType.*;

import javax.persistence.*;

import com.ssafy.backend.domain.common.BaseEntity;
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
public class Notice extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
