import api from "./api";

// ##### 태스크

// 태스크 등록
export const postTask = (
  chatroomId: string,
  description: string,
  progress: string
) =>
  api.post("/task", {
    chatroomId,
    description,
    progress,
  });

// 태스크 조회
export const getTask = (projectId: string) =>
  api.get(`/projects/${projectId}/tasks`);

// 태스크 수정
export const updateTask = (
  taskId: string,
  taskGroupId: string,
  description: string,
  progress: string
) =>
  api.patch(`/tasks/${taskId}`, {
    taskGroupId,
    description,
    progress,
  });

// 태스크 삭제
export const deleteTask = (taskId: string) => api.delete(`/tasks/${taskId}`);

// 태스크 소속 그룹 변경
export const changeTaskGroup = (taskGroupId: string, taskId: string) =>
  api.put(`/taskGroup/${taskGroupId}/tasks/taskId`);
