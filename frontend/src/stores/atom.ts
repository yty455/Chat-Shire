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

export const initialMember_recoil = atom({
  key: "initialMember_recoil",
  default: [
    {
      id: 1,
      githubId: "user",
      nickname: "user",
      position: "FE",
      profileColor: "#abb8c3",
      profileImage: "/assets/profile/male/m9.png",
      column: "전체 멤버",
    },
  ],
});

export const memberSearchResult_recoil = atom({
  key: "memberSearchResult_recoil",
  default: [
    {
      id: 1,
      githubId: "user",
      nickname: "user",
      position: "FE",
      profileColor: "#abb8c3",
      profileImage: "/assets/profile/male/m9.png",
      column: "전체 멤버",
    },
  ],
});

export const keywords_recoil = atom({
  key: "keywords_recoil",
  default: [],
});

// // 앱 종료 시 로컬 스토리지에서 Recoil 데이터 삭제
// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("recoil-persist-root");
//   localStorage.removeItem("token");
// });

interface Task {
  id: string;
  taskGroupId?: string;
  description: string;
  progress: string;
  isEditing?: boolean;
}

export const task_recoil = atom<Task>({
  key: "task",
  default: {
    id: "0",
    taskGroupId: "0",
    description: "0",
    progress: "ONGOING",
    isEditing: false,
  },
});
