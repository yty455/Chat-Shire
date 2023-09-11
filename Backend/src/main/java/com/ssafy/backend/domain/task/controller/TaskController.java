package com.ssafy.backend.domain.task.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "태스크 API", description = "태스크 관련 API")
@RestController
@RequiredArgsConstructor
public class TaskController {
}
