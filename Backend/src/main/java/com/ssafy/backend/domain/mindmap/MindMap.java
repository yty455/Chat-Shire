package com.ssafy.backend.domain.mindmap;

import javax.persistence.*;

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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
