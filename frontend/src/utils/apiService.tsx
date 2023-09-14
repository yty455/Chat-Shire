import api from "./api";

// ##### 채팅방 공지

// 채팅방 공지 등록
export const putNotification = (projectId: string, content: string) =>
  api.put(`/projects/${projectId}/notification`, {
    content,
  });

// ##### 태스크

// 태스크 등록
export const postTask = (
  chatroomId: number,
  name: string,
  description: string,
  deadline: any,
  priority: string,
  progress: string
) =>
  api.post("/task", {
    chatroomId,
    name,
    description,
    deadline,
    priority,
    progress,
  });

// 태스크 조회
export const getTask = (projectId: string) => api.get(`/tasks/${projectId}`);

// 태스크 수정
export const updateTask = (
  taskId: string,
  name: string,
  taskGroupId: string,
  description: string,
  priority: string,
  progress: string,
  deadline: any
) =>
  api.patch(`/tasks/${taskId}`, {
    taskGroupId,
    name,
    description,
    priority,
    progress,
    deadline,
  });

// 태스크 삭제
export const deleteTask = (taskId: string) => api.delete(`/tasks/${taskId}`);

// ##### 프로젝트

// 내 프로젝트 전체 조회
export const getProjects = () => api.get(`/projects`);

// 내 프로젝트 단일 상세 조회
export const getProject = (projectId: string) =>
  api.get(`/projects/${projectId}`);

// 내프로젝트 생성
export const postProject = (
  name: string,
  teamName: string,
  topic: string,
  description: string,
  gitRepository: string,
  startDate: any,
  endDate: any
) =>
  api.post("/projects", {
    name,
    teamName,
    topic,
    description,
    gitRepository,
    startDate,
    endDate,
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
  api.put(`/projects/${projectId}`);

// ##### 태스크 참조

// 태스크 참조 대화 조회
export const getReferences = (taskId: string) =>
  api.get(`/tasks/${taskId}/references`);

// 태스크 참조 삭제
export const deleteReferences = (taskId: string, referenceId: string) =>
  api.delete(`/tasks/${taskId}/references/${referenceId}`);

// 태스크 참조 등록
export const postReferences = (
  taskId: string,
  chatNumber: number,
  content: string
) =>
  api.post(`/tasks/${taskId}/references`, {
    chatNumber,
    content,
  });

//####### 채팅

// 채팅 작성
export const postChat = (chatRoomId: number, content: string) =>
  api.post("/chat", {
    chatRoomId,
    content,
  });

// ##### 유저

// 깃 회원가입
export const getGit = () => api.get(`/oauth2/sign-up`);

// 유저 회원가입
export const postUser = (name: string, nickname: string) =>
  api.post("/users", {
    name,
    nickname,
  });

// 내 정보 수정
export const updateProfile = (
  profileImage: string,
  email: string,
  name: string,
  nickname: string
) =>
  api.put(`/users`, {
    profileImage,
    email,
    name,
    nickname,
  });
