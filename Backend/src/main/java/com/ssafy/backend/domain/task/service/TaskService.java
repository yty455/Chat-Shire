package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.dto.TaskModify;
import com.ssafy.backend.domain.task.dto.TaskRegist;
import com.ssafy.backend.domain.task.repository.TaskGroupRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskGroupRepository taskGroupRepository;

    public void registerTask(TaskRegist taskRegist){
        taskRepository.save(new Task(taskRegist));

    }

    public void modifyTask(Long taskId, TaskModify taskModify){
        taskRepository.save(new Task(taskModify));

    }
}
