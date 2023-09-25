package com.ssafy.backend.domain.mindmap.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MindMapNodes {
	private Long id;

	private Integer nodeId;
	private Double x;
	private Double y;
	private Integer parentId;
	private String content;
}
