package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.dto.TaskModify;
import com.ssafy.backend.domain.task.dto.TaskRegister;
import com.ssafy.backend.domain.task.repository.ReferenceRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ReferenceRepository referenceRepository;

    // 태스크 등록
    public Long registerTask(TaskRegister taskRegister){
        ChatRoom chatRoom = chatRoomRepository.findById(taskRegister.getChatroomId())
                .orElseThrow();
        Task task = new Task(taskRegister);
        task.setChatRoom(chatRoom);

        User user = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);
        task.setUser(user);

        Task savedTask = taskRepository.save(task);

        return savedTask.getId();
    }

    // 태스크 조회
    public List<Task> getTasks(Long chatroomId){
        return taskRepository.findByUserIdAndChatRoomId(getUserId(), chatroomId)
                .orElseThrow();
    }

    // 태스크 수정
    public void modifyTask(Long taskId, TaskModify taskModify){
        Task task = taskRepository.findById(taskId)
                .orElseThrow();
        task.update(taskModify);
    }

    // 태스크 삭제
    public void deleteTask(Long taskId){
        taskRepository.deleteById(taskId);

    }



}
