package com.ssafy.backend.domain.user.dto;

import com.ssafy.backend.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class SearchUser {
	private Long id;
	private String githubId;
	private String nickname;
	private String profileImage;
	private String position;

	public static SearchUser toDto(User user) {
		return SearchUser.builder()
				.id(user.getId())
				.githubId(user.getGithubId())
				.nickname(user.getNickname())
				.profileImage(user.getProfileImage())
				.position(user.getPosition()).build();
	}

}
