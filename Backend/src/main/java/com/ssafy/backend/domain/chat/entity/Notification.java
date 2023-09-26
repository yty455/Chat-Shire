package com.ssafy.backend.domain.chat.entity;

import static javax.persistence.FetchType.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.user.User;

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
public class Notification extends BaseEntity {
	@Id
	@GeneratedValue
	@Column(name = "NOTIFICATION_ID")
	private Long id;

	@Column(nullable = false)
	private String content;

	@Column(nullable = false)
	private String url;

	@Column(nullable = false)
	private AcceptanceStatus status;

	@OnDelete(action = OnDeleteAction.CASCADE)
	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "USER_ID")
	private User receiver;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "PARTICIPATION_ID")
	private Participation participation;

	public static Notification create(User receiver, Participation participation, String content, String url) {
		return Notification.builder()
				.receiver(receiver)
				.participation(participation)
				.content(content)
				.url(url)
				.status(AcceptanceStatus.NOT_READ)
				.build();
	}
}
