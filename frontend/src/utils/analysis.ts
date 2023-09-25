import api from "./api";

//####### 통계

// 통계 불러오기
export const getAnalysis = (projectId: number) =>
  api.get(`/projects/${projectId}/statistic`);
