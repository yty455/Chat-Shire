package com.ssafy.backend.domain.mindmap;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
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
public class MindMap extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "MINDMAP_ID")
	private Long id;

	private Integer nodeId;
	private Double x;
	private Double y;
	private Integer parentId;
	private String content;

	@OneToOne
	@JoinColumn(name = "CHATROOM_ID")
	private ChatRoom chatRoom;
}
