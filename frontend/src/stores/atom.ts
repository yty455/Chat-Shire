import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const loginuser = atom({
  key: "loginuser",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const projectId = atom({
  key: "projectId",
  default: "",
});

export const isLogin_recoil = atom({
  key: "isLogin_recoil",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const message = atom({
  key: "message",
  default: "",
});

export const accessToken = atom({
  key: "accessToken ",
  default: "",
});

export const nowProject_recoil = atom<any[]>({
  key: "nowProject_recoil",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const expandedState_recoil = atom<string | false>({
  key: "expandedState",
  default: false, // 초기값 설정
});

// // 앱 종료 시 로컬 스토리지에서 Recoil 데이터 삭제
// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("recoil-persist-root");
//   localStorage.removeItem("token");
// });
