import { atom } from "recoil";

export const linkState = atom<string[]>({
  key: "linkState",
  default: [],
});
