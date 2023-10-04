package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.dto.TaskInfo;
import com.ssafy.backend.domain.task.dto.TaskInfoResponse;
import com.ssafy.backend.domain.task.dto.TaskRegister;
import com.ssafy.backend.domain.task.repository.ReferenceRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.ChallengeService;
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

    private final ChallengeService challengeService;

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

        challengeService.addTask(getUserId());
        return savedTask.getId();
    }
    
    // 태스크 조회
    // TODO 태스크 조회 어떤식으로 할건지( 개인,공통 )
    public List<TaskInfoResponse> getTasks(Long chatroomId){
        return TaskInfoResponse.fromEntityList(taskRepository.findByUserIdAndChatRoomId(getUserId(), chatroomId));
    }

    // 태스크 수정
    public void modifyTask(Long taskId, TaskInfo taskInfo){
        Task task = taskRepository.findById(taskId)
                .orElseThrow();
        task.update(taskInfo);
    }

    // 태스크 삭제
    public void deleteTask(Long taskId){
        referenceRepository.deleteAllByTaskId(taskId);
        taskRepository.deleteById(taskId);
    }

    // 태스크 그룹에 등록
    public void joinTaskGroup(Long taskGroupId, Long taskId){
        Task task = taskRepository.findById(taskId)
                .orElseThrow();

        task.joinTaskGroup(taskGroupId);
    }



}
