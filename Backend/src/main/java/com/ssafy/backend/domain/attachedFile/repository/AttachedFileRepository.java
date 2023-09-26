package com.ssafy.backend.domain.attachedFile.repository;

import com.ssafy.backend.domain.attachedFile.AttachedFile;
import com.ssafy.backend.domain.attachedFile.Category;
import com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttachedFileRepository extends JpaRepository<AttachedFile, Long> {
    @Query("select new com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo(a.url, a.thumbnail) from AttachedFile a where a.postId = :postId")
    List<AttachedFileInfo> findInfoByPostId(@Param("postId") Long postId);

    List<AttachedFile> findByPostId(Long postId);

    @Query("select new com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo(a.url, a.thumbnail) from AttachedFile a where a.chatRoomId = :chatRoomId and a.chatNumber = :chatNumber")
    List<AttachedFileInfo> findByChatRoomIdAndChatNumber(@Param("chatRoomId") Long chatRoomId, @Param("chatNumber") Long chatNumber);

    @Query("select new com.ssafy.backend.domain.attachedFile.dto.AttachedFileInfo(a.url, a.thumbnail) from AttachedFile a where a.chatRoomId = :chatRoomId and a.category = :category")
    List<AttachedFileInfo> findInfoByChatRoomIdAndCategory(@Param("chatRoomId") Long chatRoomId, @Param("category") Category category);

    void deleteAllByPostId(Long postId);
}
