package com.ssafy.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(final CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:8080")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "FETCH", "HEAD", "OPTIONS")
			.allowedHeaders("Authorization", "Authorization_refresh")
			.exposedHeaders("Authorization", "Authorization_refresh")
			.allowCredentials(true)
			.maxAge(3600);
	}
}
