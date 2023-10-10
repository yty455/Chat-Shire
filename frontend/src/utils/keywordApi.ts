import api from "./api";

//### 키워드

// 키워드 조회
export const getKeyword = (projectId:string) => api.get(`/projects/${projectId}/keywords`);

// 키워드 추가
export const postKeyword = (projectId:string, words:string[]) => api.post(`/projects/${projectId}/keywords`, {words});

// 키워드 삭제
export const deleteKeyword = (projectId:string, words:string[]) => api.delete(`/projects/${projectId}/keywords`, {data: { words }});