package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.task.repository.TaskGroupRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskGroupService {

    private final TaskRepository taskRepository;
    private final TaskGroupRepository taskGroupRepository;

    // 태스크 그룹 생성
    public void createTaskGroup(){

    }

    // 태스크 그룹에 등록
    public void registerTaskGroup(){

    }

    // 태스크 그룹 조회
    public void getTaskGroup(){

    }

    // 태스크 그룹 수정
    public void modifyTaskGroup(){

    }

    // 태스크 그룹 삭제
    public void deleteTaskGroup(){

    }


}
