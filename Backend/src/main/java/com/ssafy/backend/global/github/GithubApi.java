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

public class GithubApi {
	GitHub github;
	String token = "개인 깃허브 access Token";

	public Map<String, List<Date>> getCommitDatesSince(String repoName, String branchName, Date since) {
		Map<String, List<Date>> commitDates = new HashMap<>();

		try {
			connectToGithub(token);

			GHRepository repo = github.getRepository(repoName);
			GHRef ref = repo.getRef("heads/" + branchName);
			GHCommit commit = repo.getCommit(ref.getObject().getSha());

			PagedIterable<GHCommit> commits = commit.getOwner().listCommits();

			for (GHCommit c : commits) {
				if (c.getAuthoredDate().after(since)) {
					if (c.getCommitter() == null) continue;
					String committerName = c.getCommitter().getName();
					if (!commitDates.containsKey(committerName)) {
						commitDates.put(committerName, new ArrayList<>());
					}
					commitDates.get(committerName).add(c.getCommitDate());
				}
			}

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