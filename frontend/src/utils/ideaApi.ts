import api from "./api";

//####### 아이디어 게시판

// 아이디어 전체 불러오기
export const getIdeas = (projectId: number) =>
  api.get(`/projects/${projectId}/mind-map`);
