package com.ssafy.backend.domain.chat.service;

import static com.google.cloud.language.v1.Document.*;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.google.cloud.language.v1.ClassificationCategory;
import com.google.cloud.language.v1.ClassificationModelOptions;
import com.google.cloud.language.v1.ClassifyTextRequest;
import com.google.cloud.language.v1.ClassifyTextResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.ssafy.backend.domain.chat.Chat;
import com.ssafy.backend.domain.chat.dto.ChatInfo;
import com.ssafy.backend.domain.chat.entity.ChatRoom;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import com.ssafy.backend.domain.chat.repository.ChatRoomRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatScheduler {

	private final ChatRoomRepository chatRoomRepository;
	private final UserRepository userRepository;
	private final ChatRepository chatRepository;
	private final RedisTemplate<String, Object> redisTemplate;
	private final RedisTemplate<String, ChatInfo> chatRedisTemplate;

	private final String chatNumberKey = "chatNumber";

	@Scheduled(cron = "0 * * * * ?")
	public void chatTransfer() throws IOException {

		System.out.println("채팅 저장 실행");
		List<ChatRoom> chatRoomList = chatRoomRepository.findAll();
		Map<Long, User> userMap = userRepository.findAll().stream()
				.collect(Collectors.toMap(User::getId, Function.identity()));

		Map<Long, String> chatMap = new HashMap<>();

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String dateStr = dateFormat.format(new Date());
		String directoryPath = "output/" + dateStr;
		File directory = new File(directoryPath);
		if (!directory.exists()) {
			if (directory.mkdirs()) {
				System.out.println("디렉토리 만들었다!");
				String path = System.getProperty("user.dir");
				System.out.println("Working Directory = " + path);
			}
		} else {
			String path = System.getProperty("user.dir");
			System.out.println("Working Directory = " + path);
		}

		try (PrintWriter writer = new PrintWriter(
				String.format(directoryPath + "/output_%d.csv", System.currentTimeMillis()))) {
			for (ChatRoom chatRoom : chatRoomList) {
				String chatKey = "chat";
				List<ChatInfo> chatInfos = chatRedisTemplate.opsForList().range(chatKey + chatRoom.getId(), 0, -1);
				if (chatInfos == null)
					continue;

				// 유저별 채팅 구분 필요
				for (ChatInfo chatInfo : chatInfos) {
					if (chatMap.containsKey(chatInfo.getUserId())) {
						chatMap.put(chatInfo.getUserId(), chatMap.get(chatInfo.getUserId()) + chatInfo.getContent());
					} else {
						chatMap.put(chatInfo.getUserId(), chatInfo.getContent());
					}

					if (chatMap.get(chatInfo.getUserId()).length() >= 50) {
						List<ClassificationCategory> classificationCategories = googleNaturalAPI(chatMap,
								chatInfo);

						for (ClassificationCategory classificationCategory : classificationCategories) {
							String outputLine = String.format("%d, %s\n", chatInfo.getUserId(),
									classificationCategory.getName());
							writer.write(outputLine);
						}
					}
				}

				List<Chat> chats = chatInfos.stream()
						.map(chatInfo -> chatInfo.toEntity(userMap.get(chatInfo.getUserId()), chatRoom))
						.collect(Collectors.toList());

				chatRepository.saveAll(chats);
			}
		}
	}

	private static List<ClassificationCategory> googleNaturalAPI(Map<Long, String> chatMap, ChatInfo chatInfo) throws IOException {
		// Instantiate the Language client com.google.cloud.language.v1.LanguageServiceClient
		try (LanguageServiceClient language = LanguageServiceClient.create()) {
			System.out.println(chatMap.get(chatInfo.getUserId()));
			// Set content to the text string
			Document doc = newBuilder().setContent(chatMap.get(chatInfo.getUserId())).setType(Type.PLAIN_TEXT).build();
			ClassificationModelOptions.V2Model v2Model = ClassificationModelOptions.V2Model.newBuilder()
					.setContentCategoriesVersion(ClassificationModelOptions.V2Model.ContentCategoriesVersion.V2)
					.build();
			ClassificationModelOptions options =
					ClassificationModelOptions.newBuilder().setV2Model(v2Model).build();
			ClassifyTextRequest request =
					ClassifyTextRequest.newBuilder()
							.setDocument(doc)
							.setClassificationModelOptions(options)
							.build();
			// Detect categories in the given text
			ClassifyTextResponse response = language.classifyText(request);

			System.out.println(response.getCategoriesList().size());

			for (ClassificationCategory category : response.getCategoriesList()) {
				System.out.printf(
						"Category name : %s, Confidence : %.3f\n",
						category.getName(), category.getConfidence());
			}
			return response.getCategoriesList();
		}
	}
}
