import { selector } from "recoil";
import { loginuser } from "./atom";

// Selector 정의
export const uppercaseLoginUserSelector = selector({
  key: "uppercaseLoginUserSelector",
  get: ({ get }) => {
    const loginUser = get(loginuser) as string[];
    return loginUser.map((user) => user.toUpperCase());
  },
});
