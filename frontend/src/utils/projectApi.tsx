import api from "./api";

// ##### 프로젝트

// 내 프로젝트 전체 조회
export const getProjects = () => api.get(`/projects`);

// 내 프로젝트 단일 상세 조회
export const getProject = (projectId: string) =>
  api.get(`/projects/${projectId}`);

// 내 프로젝트 모든 멤버 조회
export const getProjectMem = (projectId: string) =>
  api.get(`/projects/${projectId}/users`);

// 내프로젝트 생성
export const postProject = (
  name: string,
  teamName: string,
  topic: string,
  description: string,
  gitRepository: string,
  branch: string,
  users: string[],
  startDate: any,
  endDate: any,
  gitAccessToken: string
) =>
  api.post("/projects", {
    name,
    teamName,
    topic,
    description,
    gitRepository,
    branch,
    users,
    startDate,
    endDate,
    gitAccessToken,
  });

// 프로젝트 수정
export const updateProject = (
  projectId: string,
  name: string,
  teamName: string,
  topic: string,
  description: string,
  gitRepository: string,
  startDate: any,
  endDate: any
) =>
  api.patch(`/projects/${projectId}`, {
    name,
    teamName,
    topic,
    description,
    gitRepository,
    startDate,
    endDate,
  });

// 프로젝트 나가기
export const outProject = (projectId: string) =>
  api.delete(`/projects/${projectId}`);
