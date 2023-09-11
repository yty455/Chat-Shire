package com.ssafy.backend.domain.chat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.ssafy.backend.domain.common.BaseEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "CHATROOM_ID")
	private Long id;

	private String name;
	private String topic;
	private String teamName;
	private String description;
	private String codeRepo;
}
