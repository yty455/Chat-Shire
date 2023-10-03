package com.ssafy.backend.domain.mindmap.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MindMapNodeInfo {
	private String id;
	private Data data;
	private Position position;
	private String parentNode;

	@Builder
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Data {
		private String label;
	}

	@Builder
	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Position{
		private Double x;
		private Double y;
	}
}
