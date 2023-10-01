package com.ssafy.backend.domain.analyze;

import javax.persistence.*;

import com.ssafy.backend.domain.chat.entity.ChatRoom;

import com.ssafy.backend.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static javax.persistence.FetchType.*;

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

	public void updateCommitCount(Long morningCommitCount, Long afternoonCommitCount, Long nightCommitCount) {
		morningCommit += morningCommitCount;
		afternoonCommit += afternoonCommitCount;
		nightCommit += nightCommitCount;
	}
}
