package com.ssafy.backend.domain.link;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.common.BaseEntity;
import com.ssafy.backend.domain.link.dto.LinkInfo;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Link extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LINK_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;

    private Long userId;
    private String content;

    public void update(LinkInfo linkInfo) {
        if (linkInfo != null && linkInfo.getContent() != null) {
            content = linkInfo.getContent();
        }
    }
}
