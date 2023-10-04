package com.ssafy.backend.domain.chat.entity;

import java.time.LocalDate;
import java.util.function.Consumer;

import javax.persistence.*;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
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
public class ChatRoom extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CHATROOM_ID")
	private Long id;

	private String name;
	private String topic;
	private String teamName;
	private String description;
	private String gitRepository;
	private String branch;
	private String gitAccessToken;
	private LocalDate startDate;
	private LocalDate endDate;

	public void update(ChatRoomInfo chatRoomInfo) {
		updateName(chatRoomInfo.getName());
		updateTopic(chatRoomInfo.getTopic());
		updateTeamName(chatRoomInfo.getTeamName());
		updateDescription(chatRoomInfo.getDescription());
		updateGitRepository(chatRoomInfo.getGitRepository());
		updateBranch(chatRoomInfo.getBranch());
		updateGitAccessToken(chatRoomInfo.getGitAccessToken());
		updateStartDate(chatRoomInfo.getStartDate());
		updateEndDate(chatRoomInfo.getEndDate());
	}

	private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
		if (newValue != null) {
			updater.accept(newValue);
		}
	}

	public void updateName(String name) {
		updateIfNotNull(newValue -> this.name = newValue, name);
	}

	public void updateTopic(String topic) {
		updateIfNotNull(newValue -> this.topic = newValue, topic);
	}

	public void updateTeamName(String teamName) {
		updateIfNotNull(newValue -> this.teamName = newValue, teamName);
	}

	public void updateDescription(String description) {
		updateIfNotNull(newValue -> this.description = newValue, description);
	}

	public void updateGitRepository(String gitRepository) {
		updateIfNotNull(newValue -> this.gitRepository = newValue, gitRepository);
	}

	public void updateBranch(String branch) {
		updateIfNotNull(newValue -> this.branch = newValue, branch);
	}

	public void updateGitAccessToken(String gitAccessToken) {
		updateIfNotNull(newValue -> this.gitAccessToken = newValue, gitAccessToken);
	}

	public void updateStartDate(LocalDate startDate) {
		updateIfNotNull(newValue -> this.startDate = newValue, startDate);
	}

	public void updateEndDate(LocalDate endDate) {
		updateIfNotNull(newValue -> this.endDate = newValue, endDate);
	}
}
