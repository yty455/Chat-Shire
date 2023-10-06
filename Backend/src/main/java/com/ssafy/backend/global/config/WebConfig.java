package com.ssafy.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(final CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://j9e205.p.ssafy.io")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS")
			.allowedHeaders("Authorization", "Authorization-Refresh")
			.exposedHeaders("Authorization", "Authorization-Refresh")
			.allowCredentials(true)
			.maxAge(3600);
	}
}
