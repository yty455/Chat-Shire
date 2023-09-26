package com.ssafy.backend.domain.attachedFile.repository;

import com.ssafy.backend.domain.attachedFile.AttachedFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachedFileRepository extends JpaRepository<AttachedFile, Long> {
}
