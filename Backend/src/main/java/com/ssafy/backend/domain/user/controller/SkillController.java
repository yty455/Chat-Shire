package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.user.Skill;
import com.ssafy.backend.domain.user.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Tag(name = "프로그래밍 언어 API", description = "프로그래밍 언어 관련 API")
@RestController
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;
    @Operation(summary = "모든 프로그래밍언어 보기", description = "선택할 수 있는 모든 프로그래밍언어를 가져옵니다.")
    @GetMapping("/skills")
    public ResponseEntity<BasicResponse> getSkills() {

        List<Skill> skills = skillService.getSkills();
        if(skills == null) skills = new ArrayList<>(); // TODO - 나중에 DB 안지워 지면 삭제
        BasicResponse basicResponse = BasicResponse.builder()
                .message("프로그래밍 언어 조회 성공")
                .count(skills.size())
                .result(Collections.singletonList(skills))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }


}
