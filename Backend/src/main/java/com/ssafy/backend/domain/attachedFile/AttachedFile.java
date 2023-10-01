package com.ssafy.backend.domain.attachedFile;

import com.ssafy.backend.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AttachedFile  extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ATTACHEDFILE_ID")
    private Long id;

    private String url;
    private String thumbnail;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Long chatRoomId;
    private Long chatNumber;
    private Long postId;

}
