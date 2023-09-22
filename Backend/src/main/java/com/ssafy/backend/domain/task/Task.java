package com.ssafy.backend.domain.task;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.task.dto.TaskInfo;
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

    @ColumnDefault("0")
    private Long taskGroupId; // 0 이면 개인 태스크인 상태

    private String description;

    @Enumerated(EnumType.STRING)
    private Progress progress;


    public Task(TaskRegister taskRegister){
        this.description = taskRegister.getDescription();
        this.progress = taskRegister.getProgress();
        this.taskGroupId = 0L;
    }

    public void joinTaskGroup(Long taskGroupId){
        this.taskGroupId = taskGroupId;
    }

    public void setUser(User user){
        this.user = user;
    }

    public void setChatRoom(ChatRoom chatRoom){
        this.chatRoom = chatRoom;
    }

    public void update(TaskInfo taskInfo) {
        updateDescription(taskInfo.getDescription());
        updateProgress(taskInfo.getProgress());
    }

    private <T> void updateIfNotNull(Consumer<T> updater, T newValue) {
        if (newValue != null) {
            updater.accept(newValue);
        }
    }

    public void updateDescription(String description) {updateIfNotNull(newValue -> this.description = newValue, description);}
    public void updateProgress(Progress progress) {updateIfNotNull(newValue -> this.progress = newValue, progress);}


}
