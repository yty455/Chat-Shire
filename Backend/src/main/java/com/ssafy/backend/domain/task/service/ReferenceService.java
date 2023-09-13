package com.ssafy.backend.domain.task.service;

import com.ssafy.backend.domain.task.Reference;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.dto.ReferenceInfo;
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
public class ReferenceService {

    private final TaskRepository taskRepository;
    private final TaskGroupRepository taskGroupRepository;
    private final ReferenceRepository referenceRepository;

    // 참조 등록
    public void registerReference(Long taskId, ReferenceInfo referenceInfo){
        Task task = taskRepository.findById(taskId)
                        .orElseThrow();
        referenceRepository.save(referenceInfo.toEntity(task));
    }

    // 참조 조회
    public List<ReferenceInfo> getReference(Long taskId){
        List<Reference> references = referenceRepository.findByTaskId(taskId);
        return ReferenceInfo.fromEntityList(references);
    }

    // 참조 삭제
    public void deleteReference(Long referenceId){
        referenceRepository.deleteById(referenceId);
    }

}
