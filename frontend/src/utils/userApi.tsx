import api from "./api";

// ##### 유저

// 깃 회원가입
export const getGit = () => api.get(`/oauth2/sign-up`);

// 유저 회원가입
export const postUser = (name: string, nickname: string) =>
  api.post("/users", {
    name,
    nickname,
  });

// 내 정보 수정
export const updateProfile = (
  profileImage: string,
  email: string,
  name: string,
  nickname: string
) =>
  api.put(`/users`, {
    profileImage,
    email,
    name,
    nickname,
  });

// 내 정보 조회
export const getProfile = () => api.get(`/users`);

// 내 정보 삭제
export const deleteUser = () => api.delete(`/users`);
