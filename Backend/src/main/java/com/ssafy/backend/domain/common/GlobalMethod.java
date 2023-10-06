package com.ssafy.backend.domain.common;

import org.springframework.security.core.context.SecurityContextHolder;

public class GlobalMethod {
	public static Long getUserId() {
		return Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
	}
}
