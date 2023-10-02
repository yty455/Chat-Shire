import api from "./api";

//####### 채팅

// 채팅 불러오기
export const getChat = (projectId: number, page: number, size: number) =>
  api.get(`/projects/${projectId}/chats?page=${page}&size=${size}`);

// 채팅 작성
export const postChat = (chatRoomId: number, content: string) =>
  api.post("/chats", {
    chatRoomId,
    content,
  });

// ##### 채팅방 공지

// 채팅방 공지 등록
export const putNotification = (projectId: string, content: string) =>
  api.put(`/projects/${projectId}/notice`, {
    content,
  });

// 첨부파일 서랍
export const getFiles = (projectId: string, category: string) =>
  api.get(`/projects/${projectId}/files/${category}`);
