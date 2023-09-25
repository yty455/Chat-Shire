import api from "./api";

//####### 통계

// 통계 불러오기
export const getAnalysis = (projectId: string) =>
  api.get(`/projects/${projectId}/statistic`);
