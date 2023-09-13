package com.ssafy.backend.domain.common;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class BasicResponse {

	@Builder.Default
	private HttpStatus httpStatus = HttpStatus.OK; // http 상태코드번호(200, 404)
	@Builder.Default
	private Integer code = HttpStatus.OK.value(); // http 상태코드명(OK, NOT FOUND)
	private String message; // response 정보 (사용자 조회 성공)
	private Integer count; // 반환 개수
	private List<Object> result; // 실제 response 데이터
}
