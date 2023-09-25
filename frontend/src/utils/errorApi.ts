import api from "./api";

//####### 에러 게시판

// 에러 전체 불러오기
export const getErrors = (projectId: number) =>
  api.get(`/projects/${projectId}/posts`);

// 에러 단일 상세 불러오기
export const getErrorDetail = (postId: number) => api.get(`/posts/${postId}`);

// 에러 작성
export const postError = (
  projectId: number,
  title: string,
  content: string,
  skillName: []
) => api.post(`/projects/${projectId}/posts`, { title, content, skillName });

// 에러 수정
export const updateError = (
  postId: number,
  title: string,
  content: string,
  skillName: []
) => api.patch(`/posts/${postId}`, { title, content, skillName });

// 에러 삭제
export const deleteError = (postId: number) => api.delete(`/posts/${postId}`);
