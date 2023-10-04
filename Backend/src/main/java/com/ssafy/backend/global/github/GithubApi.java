package com.ssafy.backend.global.github;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.kohsuke.github.GHCommit;
import org.kohsuke.github.GHRef;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.kohsuke.github.PagedIterable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GithubApi {

	private final RedisTemplate<String, Object> redisTemplate;
	GitHub github;

	public Map<String, List<Date>> getCommitDatesSince(String repoName, String branchName, String token) {
		Map<String, List<Date>> commitDates = new HashMap<>();

		try {
			// since 는 redis 에서 최근 커밋 시간을 가져와서 전달한다.
			Date since = (Date)redisTemplate.opsForValue().get("latest_commit:" + repoName);

			connectToGithub(token);

			GHRepository repo = github.getRepository(repoName);
			GHRef ref = repo.getRef("heads/" + branchName);
			GHCommit commit = repo.getCommit(ref.getObject().getSha());

			PagedIterable<GHCommit> commits = commit.getOwner().listCommits();

			Date latest = new Date(0);
			for (GHCommit c : commits) {
				if (c.getAuthoredDate().after(since)) {
					if (c.getCommitter() == null)
						continue;
					String committerName = c.getCommitter().getLogin();
					if (!commitDates.containsKey(committerName)) {
						commitDates.put(committerName, new ArrayList<>());
					}
					commitDates.get(committerName).add(c.getCommitDate());
				}
				if (c.getCommitDate().after(latest)) {
					latest = c.getCommitDate();
				}
			}
			// Redis 에 저장소를 Key 로 사용해서 최근 커밋 시간을 저장해둔다.
			redisTemplate.opsForValue().set("latest_commit:" + repoName, latest);

		} catch (IOException e) {
			throw new IllegalArgumentException("Failed to connect to GitHub or retrieve data");
		}

		return commitDates;
	}

	private void connectToGithub(String token) throws IOException {
		github = new GitHubBuilder().withOAuthToken(token).build();
		github.checkApiUrlValidity();
	}
}