import api from "./api";

// ##### 태스크 그룹
// 태스크 그룹 조회
export const getTaskGroup = (projectId: string) =>
  api.get(`/projects/${projectId}/taskgroup`);

// 태스크 그룹 상세조회
export const getTaskGroupDetail = (taskGroupId: string | number) =>
  api.get(`/taskgroup/${taskGroupId}`);

// 태스크 그룹 수정
export const updateTaskGroup = (
  taskGroupId: string,
  name: String,
  description: String,
  priority: String,
  progress: String,
  deadline: String
) =>
  api.patch(`/taskgroup/${taskGroupId}`, {
    name,
    description,
    priority,
    progress,
    deadline,
  });

// 태스크 그룹 생성
export const postTaskGroup = (
  chatRoomId: String,
  name: String,
  description: String,
  priority: String,
  progress: String,
  deadline: String
) =>
  api.post(`/taskgroup`, {
    chatRoomId,
    name,
    description,
    priority,
    progress,
    deadline,
  });

// 태스크 그룹 삭제
export const deleteTaskGroup = (taskGroupId: string) =>
  api.delete(`/taskgroup/${taskGroupId}`);
