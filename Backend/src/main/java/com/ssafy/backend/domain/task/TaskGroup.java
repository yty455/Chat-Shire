package com.ssafy.backend.domain.task;

import javax.persistence.*;

import com.ssafy.backend.domain.chat.entity.ChatRoom;

import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.task.dto.TaskGroupInfo;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.function.Consumer;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaskGroup extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TASKGROUP_ID")
	private Long id;

	private String name;

	private String description;

	@Enumerated(EnumType.STRING)
	private Priority priority;

	@Enumerated(EnumType.STRING)
	private Progress progress;

	private LocalDate deadline;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "CHATROOM_ID")
	private ChatRoom chatRoom;

	public void update(TaskGroupInfo taskGroupInfo){
		updateName(taskGroupInfo.getName());
		updateDescription(taskGroupInfo.getDescription());
		updateDeadline(taskGroupInfo.getDeadline());
		updatePriority(taskGroupInfo.getPriority());
		updateProgress(taskGroupInfo.getProgress());
	}

	private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
		if (newValue != null) {
			updater.accept(newValue);
		}
	}

	public void updateName(String name) {updateIfNotNull(newValue -> this.name = newValue, name);}
	public void updateDescription(String description) {updateIfNotNull(newValue -> this.description = newValue, description);}
	public void updatePriority(Priority priority) {updateIfNotNull(newValue -> this.priority = newValue, priority);}
	public void updateProgress(Progress progress) {updateIfNotNull(newValue -> this.progress = newValue, progress);}
	public void updateDeadline(LocalDate deadline) {updateIfNotNull(newValue -> this.deadline = newValue, deadline);}


}
