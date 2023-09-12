package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.TaskGroup;
import com.ssafy.backend.domain.task.dto.TaskGroupInfo;
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

    // 태스크 그룹 조회
    public void getTaskGroup(){

    }

    // 태스크 그룹 수정
    public void modifyTaskGroup(Long taskGroupId, TaskGroupInfo taskGroupInfo){
        TaskGroup taskGroup = taskGroupRepository.findById(taskGroupId)
                .orElseThrow();

        taskGroup.update(taskGroupInfo);
    }

    // 태스크 그룹 삭제
    public void deleteTaskGroup(Long taskGroupId){
        taskGroupRepository.deleteById(taskGroupId);
    }

}
