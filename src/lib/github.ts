import { Octokit } from "octokit"

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const githubUrl = "https://api.github.com/repos/owner/repo/commits"

type Response = {
  commitHash: string
  commitMessage: string
  commitAuthorName: string
  commitAuthorAvatar: string
  commitDate: string
}

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
  const {data} = await octokit.rest.repos.listCommits({
    owner: "arnoldart",
    repo: "sprintly"
  })
}