package com.ssafy.backend.domain.link.service;

import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.link.Link;
import com.ssafy.backend.domain.link.dto.LinkInfo;
import com.ssafy.backend.domain.link.dto.LinkInfoResponse;
import com.ssafy.backend.domain.link.repository.LinkRepository;
import com.ssafy.backend.domain.user.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Service
@Transactional
@RequiredArgsConstructor
public class LinkService {

    private final LinkRepository linkRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChallengeService challengeService;

    public Long registerLink(Long chatRoomId, LinkInfo linkInfo) {

        challengeService.addLink(getUserId());

        return linkRepository.save(linkInfo.toEntity(linkInfo,
                        getUserId(),
                        chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new ResourceNotFoundException("Link.getChatRoom", chatRoomId))))
                .getId();
    }

    public List<LinkInfoResponse> getLinks(Long chatRoomId) {
        return linkRepository.findByChatRoomId(chatRoomId).stream()
                .map(LinkInfoResponse::fromEntity)
                .collect(Collectors.toList());

    }

    public void modifyLink(Long linkId, LinkInfo linkInfo) {

        Link link = linkRepository.findById(linkId)
                .orElseThrow(() -> new ResourceNotFoundException("Link.getLink", linkId));
        link.update(linkInfo);
    }

    public void deleteLink(Long linkId) {
        linkRepository.deleteById(linkId);
    }

}
