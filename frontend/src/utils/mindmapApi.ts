import api from "./api";

//####### 마인드맵

// 마인드맵 조회
export const getMindMap = (projectId: string) =>
  api.get(`/projects/${projectId}/mind-map`);

// 마인드맵 저장
export const saveMindmap = (projectId: string, mindMapNodes: []) =>
  api.post(`/projects/${projectId}/mind-map`, mindMapNodes);
