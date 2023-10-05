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
  nickname: string,
  content: string,
  chatNumber: number,
  chatTime: any
) =>
  api.post(`/tasks/${taskId}/references`, {
    nickname,
    content,
    chatNumber,
    chatTime,
  });

// 태스크 참조 대화 10개 조회
export const getReferencesChat = (referenceId: string) =>
  api.get(`/reference/${referenceId}/chats`);
