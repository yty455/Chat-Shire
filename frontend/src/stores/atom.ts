import { atom } from "recoil";

export const loginuser = atom({
  key: "loginuser",
  default: [],
});

export const accessToken = atom({
  key: "accessToken ",
  default: "",
});
