import api from "./api";

// ##### 태스크 그룹
// 태스크 그룹 조회
export const getTaskGroup = (projectId: string) =>
  api.get(`/projects/${projectId}/taskgroup`);

// 태스크 그룹 상세조회
export const getTaskGroupDetail = (taskGroupId: string) =>
  api.get(`/taskgroup/${taskGroupId}`);

// 태스크 그룹 수정
export const updateTaskGroup = (taskGroupId: string) =>
  api.patch(`/taskgroup/${taskGroupId}`);

// 태스크 그룹 생성
export const postTaskGroup = () => api.post(`/taskgroup`);

// 태스크 그룹 삭제
export const deleteTaskGroup = (taskGroupId: string) =>
  api.delete(`/taskgroup/${taskGroupId}`);
