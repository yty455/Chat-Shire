import api from "./api";

//### 키워드

// 키워드 조회
export const getKeyword = (projectId:string) => api.get(`/projects/${projectId}/keywords`);

// 키워드 추가
export const postKeyword = (projectId:string, word:string[]) => api.post(`/projects/${projectId}/keywords`, {word});

// 키워드 삭제
export const deleteKeyword = (projectId:string, word:string[]) => api.delete(`/projects/${projectId}/keywords`, {data: { word }});