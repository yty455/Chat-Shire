package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.entity.AcceptanceStatus;
import com.ssafy.backend.domain.chat.entity.Notification;
import com.ssafy.backend.domain.chat.entity.Participation;
import com.ssafy.backend.domain.chat.repository.NotificationRepository;
import com.ssafy.backend.domain.chat.repository.ParticipationRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.user.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InvitationService {

    private final NotificationRepository notificationRepository;
    private final ParticipationRepository participationRepository;
    private final ChallengeService challengeService;

    public List<Notification> getMyInvitation() {
        return notificationRepository.findAllByReceiverIdAndStatus(getUserId(), AcceptanceStatus.NOT_READ);
    }

    @Transactional
    public void acceptInvitation(Long invitationId) {
        Notification notification = notificationRepository.findById(invitationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", invitationId));
        notification.accept();

        participation(notification);

        // 도전과제 추가
        challengeService.addProject(getUserId());
    }

    private void participation(Notification notification) {
        participationRepository.save(Participation.create(notification.getReceiver(), notification.getParticipation().getChatRoom()));
    }

	@Transactional
	public void rejectInvitation(Long invitationId) {
		Notification notification = notificationRepository.findById(invitationId)
				.orElseThrow(() -> new ResourceNotFoundException("Notification", invitationId));
		notification.reject();
	}
}
