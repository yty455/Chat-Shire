import api from "./api";

// ##### 태스크

// 태스크 등록
export const postTask = (
  chatroomId: number,
  name: string,
  description: string,
  deadline: any,
  priority: string,
  progress: string
) =>
  api.post("/task", {
    chatroomId,
    name,
    description,
    deadline,
    priority,
    progress,
  });

// 태스크 조회
export const getTask = (projectId: string) =>
  api.get(`/projects/${projectId}/tasks`);

// 태스크 수정
export const updateTask = (
  taskId: string,
  name: string,
  taskGroupId: string,
  description: string,
  priority: string,
  progress: string,
  deadline: any
) =>
  api.patch(`/tasks/${taskId}`, {
    taskGroupId,
    name,
    description,
    priority,
    progress,
    deadline,
  });

// 태스크 삭제
export const deleteTask = (taskId: string) => api.delete(`/tasks/${taskId}`);

// 태스크 소속 그룹 변경
export const changeTaskGroup = (taskGroupId: string, taskId: string) =>
  api.put(`/taskGroup/${taskGroupId}/tasks/taskId`);
