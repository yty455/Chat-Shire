package com.ssafy.backend.domain.analyze;

import static javax.persistence.FetchType.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Entity
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Statistic extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "STATISTIC_ID")
	private Long id;

	private Long morningCommit;
	private Long afternoonCommit;
	private Long nightCommit;

	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "CHATROOM_ID")
	private ChatRoom chatRoom;

	public static Statistic create(ChatRoom chatRoom) {
		return Statistic.builder()
				.morningCommit(0L)
				.afternoonCommit(0L)
				.nightCommit(0L)
				.chatRoom(chatRoom)
				.build();
	}

	public void updateCommitCount(Long morningCommitCount, Long afternoonCommitCount, Long nightCommitCount) {
		morningCommit += morningCommitCount;
		afternoonCommit += afternoonCommitCount;
		nightCommit += nightCommitCount;
	}
}
