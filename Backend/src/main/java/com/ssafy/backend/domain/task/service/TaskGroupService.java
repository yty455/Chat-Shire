package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.TaskGroup;
import com.ssafy.backend.domain.task.dto.TaskGroupInfo;
import com.ssafy.backend.domain.task.dto.TaskGroupRegister;
import com.ssafy.backend.domain.task.repository.TaskGroupRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskGroupService {

    private final ChatRoomRepository chatRoomRepository;
    private final TaskRepository taskRepository;
    private final TaskGroupRepository taskGroupRepository;

    // 태스크 그룹 생성
    public void createTaskGroup(TaskGroupRegister taskGroupRegister){
        ChatRoom chatRoom = chatRoomRepository.findById(taskGroupRegister.getChatRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("TaskGroup.getChatRoom", taskGroupRegister.getChatRoomId()));


        TaskGroup taskGroup = TaskGroup.builder()
                .name(taskGroupRegister.getName())
                .priority(taskGroupRegister.getPriority())
                .chatRoom(chatRoom).build();

        taskGroupRepository.save(taskGroup);
    }

    // 태스크 그룹 조회
    public List<TaskGroup> getTaskGroup(Long chatRoomId){
        List<TaskGroup> taskGroupInfoList = taskGroupRepository.findByChatRoomId(chatRoomId);
        return taskGroupInfoList;
    }

    // 태스크 그룹 수정
    public void modifyTaskGroup(Long taskGroupId, TaskGroupInfo taskGroupInfo){
        TaskGroup taskGroup = taskGroupRepository.findById(taskGroupId)
                .orElseThrow(() -> new ResourceNotFoundException("TaskGroup.modifyTaskGroup", taskGroupId));

        taskGroup.update(taskGroupInfo);
    }

    // 태스크 그룹 삭제
    public void deleteTaskGroup(Long taskGroupId){
        taskGroupRepository.deleteById(taskGroupId);
    }

}
