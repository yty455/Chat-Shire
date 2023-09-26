package com.ssafy.backend.domain.attachedFile.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AttachedFileInfo {
    String url;
    String thumbnail;

    public AttachedFileInfo(String url, String thumbnail){
        this.url = url;
        this.thumbnail = thumbnail;
    }
}
