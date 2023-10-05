package com.ssafy.backend.domain.task.repository;

import com.ssafy.backend.domain.task.Reference;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.dto.ReferenceChatInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
    List<Reference> findByTaskId(Long taskId);

    @Query("select new com.ssafy.backend.domain.task.dto.ReferenceChatInfo(r.chatNumber, t.chatRoom.id) from Reference r join r.task t where r.id = :referenceId")
    ReferenceChatInfo findReferenceChatById(@Param("referenceId") Long referenceId);

    void deleteAllByTaskId(Long taskId);

    void deleteAllByTask(Task task);
}
