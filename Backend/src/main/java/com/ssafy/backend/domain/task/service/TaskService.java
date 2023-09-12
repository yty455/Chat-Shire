package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.dto.TaskModify;
import com.ssafy.backend.domain.task.dto.TaskRegister;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ChatRoomRepository chatRoomRepository;

    // 태스크 등록
    public void registerTask(TaskRegister taskRegister){
        ChatRoom chatRoom = chatRoomRepository.findById(taskRegister.getChatroomId())
                .orElseThrow();
        Task task = new Task(taskRegister);
        task.setChatRoom(chatRoom);

    }

    // 태스크 수정
    public void modifyTask(Long taskId, TaskModify taskModify){
        taskRepository.save(new Task(taskModify));

    }

    // 태스크 완료
    public void taskDone(Long taskId){

    }

    // 태스크 삭제
    public void deleteTask(Long taskId){

    }



}
