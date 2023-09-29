package com.ssafy.backend.domain.analyze;

import com.ssafy.backend.domain.chat.entity.ChatRoom;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Keyword {
    @Id
    @GeneratedValue
    @Column(name = "KEYWORD_ID")
    private Long id;

    private String word;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "CHATROOM_ID")
    private ChatRoom chatRoom;

    public static Keyword create(ChatRoom chatRoom, String word) {
        Keyword keyword = new Keyword();
        keyword.word = word;
        keyword.chatRoom = chatRoom;
        return keyword;
    }
}
