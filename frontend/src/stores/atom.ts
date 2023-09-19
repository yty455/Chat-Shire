import { atom } from "recoil";

export const loginuser = atom({
  key: "loginuser",
  default: [],
});

export const projectId = atom({
  key: "projectId",
  default: "",
});

export const message = atom({
  key: "message",
  default: "",
});

export const accessToken = atom({
  key: "accessToken ",
  default: "",
});
