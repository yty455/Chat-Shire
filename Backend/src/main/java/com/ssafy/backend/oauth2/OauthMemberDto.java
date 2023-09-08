package com.ssafy.backend.oauth2;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Setter
@Getter
public class OauthMemberDto {
    private int id;
    private String name;
    private String email;
    private Date created;
    private List<String> roles = new ArrayList<>();
}
