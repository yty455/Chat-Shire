import api from "./api";

// ##### 태스크 참조

// 태스크 참조 대화 조회
export const getReferences = (taskId: string) =>
  api.get(`/tasks/${taskId}/references`);

// 태스크 참조 삭제
export const deleteReferences = (taskId: string, referenceId: string) =>
  api.delete(`/tasks/${taskId}/references/${referenceId}`);

// 태스크 참조 등록
export const postReferences = (
  taskId: string,
  chatNumber: number,
  content: string
) =>
  api.post(`/tasks/${taskId}/references`, {
    chatNumber,
    content,
  });
