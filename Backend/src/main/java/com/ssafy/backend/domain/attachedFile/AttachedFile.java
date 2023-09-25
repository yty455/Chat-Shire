package com.ssafy.backend.domain.attachedFile;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttachedFile  extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "ATTACHEDFILE_ID")
    private Long id;

    private String url;
    private String thumbnail;
//    private
    private Long chatNumber;
    private Long postId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;
}
