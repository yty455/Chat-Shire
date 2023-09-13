package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.task.Reference;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.TaskGroup;
import com.ssafy.backend.domain.task.dto.*;
import com.ssafy.backend.domain.task.repository.ReferenceRepository;
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
    private final ReferenceRepository referenceRepository;

    // 태스크 그룹 생성
    public Long createTaskGroup(TaskGroupRegister taskGroupRegister){
        ChatRoom chatRoom = chatRoomRepository.findById(taskGroupRegister.getChatRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("TaskGroup.getChatRoom", taskGroupRegister.getChatRoomId()));


        TaskGroup taskGroup = TaskGroup.builder()
                .name(taskGroupRegister.getName())
                .priority(taskGroupRegister.getPriority())
                .chatRoom(chatRoom).build();

        return taskGroupRepository.save(taskGroup).getId();
    }

    // 태스크 그룹 조회
    public List<TaskGroupInfoResponse> getTaskGroup(Long chatRoomId){
        List<TaskGroup> taskGroups  = taskGroupRepository.findByChatRoomId(chatRoomId);
        List<TaskGroupInfoResponse> taskGroupInfoList = TaskGroupInfoResponse.fromEntityList(taskGroups);
        for(TaskGroupInfoResponse taskGroupInfoResponse : taskGroupInfoList){
            Long id = taskGroupInfoResponse.getId();
            List<Task> tasks = taskRepository.findByTaskGroupId(id);
            taskGroupInfoResponse.setTaskInfoResponses(TaskInfoResponse.fromEntityList(tasks));
        }
        return taskGroupInfoList;
    }

    // 태스크 그룹 상세
    public TaskGroupInfoDetailResponse getTaskGroupDetail(Long taskGroupId){
        // 태스크 그룹을 찾고
        TaskGroup taskGroup = taskGroupRepository.findById(taskGroupId)
                .orElseThrow();
        // 그룹에 연결된 태스크를 찾고
        List<Task> tasks = taskRepository.findByTaskGroupId(taskGroupId);
        List<TaskInfoDetailResponse> taskInfoDetailResponses = TaskInfoDetailResponse.fromEntityList(tasks);
        for(TaskInfoDetailResponse taskInfoDetailResponse : taskInfoDetailResponses){
            // 태스크에 연결된 참조를 찾고
            Long id = taskInfoDetailResponse.getId();
            List<Reference> references = referenceRepository.findByTaskId(id);
            taskInfoDetailResponse.setReferenceInfoResponse(ReferenceInfoResponse.fromEntityList(references));
        }
        TaskGroupInfoDetailResponse taskGroupInfoDetailResponse = TaskGroupInfoDetailResponse.fromEntity(taskGroup);
        taskGroupInfoDetailResponse.setTaskInfoDetailResponse(taskInfoDetailResponses);
        return taskGroupInfoDetailResponse;
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
