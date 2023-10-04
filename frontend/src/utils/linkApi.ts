import api from "./api";

//####### 링크

// 링크 조회
export const getLinks = (projectId: string) =>
  api.get(`/projects/${projectId}/links`);

// 링크 등록
export const postLink = (projectId: string, content: string) =>
  api.post(`/projects/${projectId}/links`, { content });

// 링크 수정
export const updateLink = (linkId: string, content: string) =>
  api.patch(`/links/${linkId}`, { content });

// 링크 삭제
export const deleteLink = (linkId: string) => api.delete(`/links/${linkId}`);
