package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.chat.repository.ChatRepository;
import com.ssafy.backend.domain.chat.repository.DistributedRepository;
import com.ssafy.backend.domain.chat.repository.NotificationRepository;
import com.ssafy.backend.domain.chat.repository.ParticipationRepository;
import com.ssafy.backend.domain.common.exception.ResourceNotFoundException;
import com.ssafy.backend.domain.post.Post;
import com.ssafy.backend.domain.post.repository.PostRepository;
import com.ssafy.backend.domain.post.repository.PostSkillRepository;
import com.ssafy.backend.domain.post.repository.ReplyRepository;
import com.ssafy.backend.domain.task.Task;
import com.ssafy.backend.domain.task.repository.ReferenceRepository;
import com.ssafy.backend.domain.task.repository.TaskRepository;
import com.ssafy.backend.domain.user.*;
import com.ssafy.backend.domain.user.dto.*;
import com.ssafy.backend.domain.user.exception.UserNotFoundException;
import com.ssafy.backend.domain.user.repository.ChallengeRepository;
import com.ssafy.backend.domain.user.repository.MySkillRepository;
import com.ssafy.backend.domain.user.repository.SkillRepository;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.backend.domain.common.GlobalMethod.getUserId;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final MySkillRepository mySkillRepository;
    private final ChallengeRepository challengeRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final ChallengeService challengeService;
    private final ChatRepository chatRepository;
    private final TaskRepository taskRepository;
    private final ReplyRepository replyRepository;
    private final PostRepository postRepository;
    private final DistributedRepository distributedRepository;
    private final NotificationRepository notificationRepository;
    private final ReferenceRepository referenceRepository;
    private final PostSkillRepository postSkillRepository;
    private final ParticipationRepository participationRepository;

    @Transactional
    public void signUp(UserInfo userInfo) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.update(userInfo);
        findUser.authorizeUser();

        if (userInfo.getMySkill() == null)
            return;
        // 언어 스킬 등록
        Map<String, Skill> skillMap = skillRepository.findAll().stream()
                .collect(Collectors.toMap(Skill::getSkillName, skill -> skill));

        userInfo.getMySkill().stream()
                .map(skillMap::get)
                .map(skill -> MySkill.builder()
                        .skill(skill)
                        .user(findUser)
                        .build())
                .forEach(mySkillRepository::save);


        redisTemplate.opsForValue().set("userState-" + getUserId(), String.valueOf(State.ONLINE));

    }

    @Transactional
    public UserInfoResponse getUserProfile() {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);
        List<String> mySkills = mySkillRepository.findByUser(findUser);

        Challenge challenge = challengeRepository.findByUserId(getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Challenge.user", getUserId()));
        ChallengeInfoResponse challengeInfoResponse = ChallengeInfoResponse.fromEntity(challenge);

        String state = redisTemplate.opsForValue().get("userState-" + getUserId());

        // 연속 로그인 검증
        String lastLogin = redisTemplate.opsForValue().get("lastLogin-" + getUserId());
        redisTemplate.opsForValue().set("lastLogin-" + getUserId(), LocalDate.now().toString());
        if (lastLogin == null) {
            redisTemplate.opsForValue().set("loginCount-" + getUserId(), "1");
        } else {
            LocalDate lastLoginDate = LocalDate.parse(lastLogin);
            // 연속 로그인이면
            if (LocalDate.now().isEqual(lastLoginDate.plusDays(1))) {
                int loginCount = Integer.parseInt(redisTemplate.opsForValue().get("loginCount-" + getUserId())) + 1;
                if (challenge.getLogin() < loginCount) {
                    challenge.addLogin(loginCount);
                }
                redisTemplate.opsForValue().set("loginCount-" + getUserId(), String.valueOf(loginCount));
            } else if (!LocalDate.now().isEqual(lastLoginDate)) {
                redisTemplate.opsForValue().set("loginCount-" + getUserId(), "1");
            }
        }

        UserInfoResponse userInfoResponse = UserInfoResponse.fromEntity(findUser, mySkills, challengeInfoResponse, state);

        // 커밋 수
        userInfoResponse.setDayCommit(challenge);
        // 에러 게시글, 댓글 수
        int errorCount = postRepository.countByUserId(getUserId()) + replyRepository.countByUserId(getUserId());
        // 총 채팅 수
        int chatCount = chatRepository.countByUserId(getUserId());
        // 주제 관련 채팅 수
        int topicCount = distributedRepository.findSumOfCountByUserId(getUserId())
                .orElse(0);
        // 일정 관리
        int taskCount = taskRepository.countByUserId(getUserId());
        userInfoResponse.setCount(errorCount, chatCount, topicCount, taskCount);
        return userInfoResponse;
    }

    @Transactional
    public void modifyUserProfile(UserInfo userInfo) {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);

        findUser.update(userInfo);

        if (userInfo.getMySkill() == null)
            return;

        // 언어 스킬 재등록
        Map<String, Skill> skillMap = skillRepository.findAll().stream()
                .collect(Collectors.toMap(Skill::getSkillName, skill -> skill));
        // 내가 등록한 언어 스킬
        List<MySkillInfo> mySkills = mySkillRepository.findByUserId(getUserId());
        // 수정한 언어 목록
        Set<String> modifySkillSet = new HashSet<>(userInfo.getMySkill());

        for (MySkillInfo mySkill : mySkills) {
            if (modifySkillSet.contains(mySkill.getSkillName())) {
                modifySkillSet.remove(mySkill.getSkillName());
            } else {
                mySkillRepository.deleteById(mySkill.getId());
            }
        }

        for (String name : modifySkillSet) {
            mySkillRepository.save(MySkill.builder()
                    .skill(skillMap.get(name))
                    .user(findUser).build());
        }

    }

    @Transactional
    public void withdrawal() {
        User findUser = userRepository.findById(getUserId())
                .orElseThrow(UserNotFoundException::new);
        // TODO - CASCADE 적용하기
        // 하나씩 차근차근 합시다
        // 한큐 - 도전과제, 프로그래밍언어, 알림, 분산, 참여
        challengeRepository.deleteAllByUserId(getUserId());
        mySkillRepository.deleteAllByUserId(getUserId());
        distributedRepository.deleteAllByUserId(getUserId());
//        notificationRepository.deleteAllByUserId(getUserId()); // casecade 설정 해놨음 엔티티에
        participationRepository.deleteAllByUserId(getUserId());
        // 챗 TODO - 할거많음. 레디스에 있는 채팅 어케 저장안되게 할건지
        chatRepository.deleteAllByUserId(getUserId());

        // 한번 거쳐야 하는애들 - (태스크-참조), (댓글 먼저지우고, 게시판 언어 지우고 게시판 지우기)
        List<Task> tasks = taskRepository.findAllByUserId(getUserId());
        tasks.forEach(referenceRepository::deleteAllByTask);
        taskRepository.deleteAllByUserId(getUserId());

        replyRepository.deleteAllByUserId(getUserId());
        List<Post> posts = postRepository.findAllByUserId(getUserId());
        posts.forEach(postSkillRepository::deleteAllByPost);
        postRepository.deleteAllByUserId(getUserId());

        userRepository.delete(findUser);
    }

    @Transactional
    public void updateState(State state) {
        redisTemplate.opsForValue().set("userState-" + getUserId(), String.valueOf(state));
    }

    public List<SearchUser> getUserInfo(String githubId) {
        return userRepository.findByGithubIdContaining(githubId).stream()
                .filter(user -> !Objects.equals(user.getId(), getUserId()))
                .map(SearchUser::toDto)
                .collect(Collectors.toList());
    }
}
