package com.ssafy.backend.domain.analyze;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.ssafy.backend.domain.chat.entity.ChatRoom;

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
public class Statistic {
	@Id
	@GeneratedValue
	@Column(name = "STATISTIC_ID")
	private Long id;

	private Long morningCommit;
	private Long afternoonCommit;
	private Long nightCommit;
	private Long issueCount;
	private Long chatCount;
	private Long topicChatCount;
	private Long taskCount;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CHATROOM_ID")
	private ChatRoom chatRoom;

	public void updateCommitCount(Long morningCommitCount, Long afternoonCommitCount, Long nightCommitCount) {
		morningCommit += morningCommitCount;
		afternoonCommit += afternoonCommitCount;
		nightCommit += nightCommitCount;
	}
}
