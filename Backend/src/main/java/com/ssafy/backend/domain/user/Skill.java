package com.ssafy.backend.domain.user;

import com.ssafy.backend.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Skill extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "SKILL_ID")
    private Long id;

    private String skillName;
}
