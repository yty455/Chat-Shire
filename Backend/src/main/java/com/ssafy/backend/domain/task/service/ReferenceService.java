package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.task.repository.TaskGroupRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReferenceService {

    private final TaskRepository taskRepository;
    private final TaskGroupRepository taskGroupRepository;

    // 참조 등록
    public void registerReference(Long taskId){

    }

    // 참조 조회
    public void getReference(Long taskId){

    }

    // 참조 삭제
    public void deleteReference(Long taskId){

    }

}
