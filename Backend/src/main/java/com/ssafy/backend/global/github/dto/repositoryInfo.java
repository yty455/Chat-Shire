package com.ssafy.backend.global.github.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class repositoryInfo {
	private String gitRepository;
	private String branch;
}
