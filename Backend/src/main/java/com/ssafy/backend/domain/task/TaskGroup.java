package com.ssafy.backend.domain.task;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.backend.domain.chat.entity.ChatRoom;

import com.ssafy.backend.domain.task.dto.TaskGroupInfo;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.function.Consumer;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaskGroup {
	@Id
	@GeneratedValue
	@Column(name = "TASKGROUP_ID")
	private Long id;

	private String name;

	@Enumerated(EnumType.STRING)
	private Priority priority;

	@ManyToOne
	@JoinColumn(name = "CHATROOM_ID")
	private ChatRoom chatRoom;

	public void update(TaskGroupInfo taskGroupInfo){
		updateName(taskGroupInfo.getName());
	}

	private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
		if (newValue != null) {
			updater.accept(newValue);
		}
	}


	public void updateName(String name) {updateIfNotNull(newValue -> this.name = newValue, name);}
}
