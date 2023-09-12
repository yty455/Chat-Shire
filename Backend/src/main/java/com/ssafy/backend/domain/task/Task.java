package com.ssafy.backend.domain.task;

import com.ssafy.backend.domain.chat.dto.ChatRoomInfo;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.task.dto.TaskModify;
import com.ssafy.backend.domain.task.dto.TaskRegister;
import com.ssafy.backend.domain.user.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.function.Consumer;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
public class Task {

    @Id
    @GeneratedValue
    @Column(name = "TASK_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;

    @ColumnDefault("-1")
    private Long taskGroupId; // -1이면 개인 태스크인 상태

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private Progress progress;

    private LocalDate deadline;

    public Task(TaskRegister taskRegister){
        this.name = taskRegister.getName();
        this.description = taskRegister.getDescription();
        this.deadline = taskRegister.getDeadline();
        this.priority = taskRegister.getPriority();
        this.progress = taskRegister.getProgress();
    }

    public void setUser(User user){
        this.user = user;
//        chatRoom.getTask().add(this);
    }

    public void setChatRoom(ChatRoom chatRoom){
        this.chatRoom = chatRoom;
//        chatRoom.getTask().add(this);
    }

    public void update(TaskModify taskModify) {
        updateName(taskModify.getName());
        updateDescription(taskModify.getDescription());
        updateDeadline(taskModify.getDeadline());
        updatePriority(taskModify.getPriority());
        updateProgress(taskModify.getProgress());
    }

    private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
        if (newValue != null) {
            updater.accept(newValue);
        }
    }

    public void updateName(String name) {updateIfNotNull(newValue -> this.name = newValue, name);}
    public void updateDescription(String description) {updateIfNotNull(newValue -> this.description = newValue, description);}
    public void updateDeadline(LocalDate deadline) {updateIfNotNull(newValue -> this.deadline = newValue, deadline);}
    public void updatePriority(Priority priority) {updateIfNotNull(newValue -> this.priority = newValue, priority);}
    public void updateProgress(Progress progress) {updateIfNotNull(newValue -> this.progress = newValue, progress);}


}
