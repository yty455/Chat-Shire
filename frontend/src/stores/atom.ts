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

interface Task {
  id: string;
  taskGroupId?: string;
  description: string;
  progress: string;
  isEditing?: boolean;
}

export const tasks_recoil = atom<Task[]>({
  key: "tasks",
  default: [
    {
      id: "0",
      taskGroupId: "0",
      description: "0",
      progress: "ONGOING",
      isEditing: false,
    },
  ],
});

export const allTeamTask_recoil = atom<[]>({
  key: "allTeamTask_recoil",
  default: [], // 초기값 설정
});
export const ongoingTeamTask_recoil = atom<[]>({
  key: "ongoingTeamTask_recoil",
  default: [], // 초기값 설정
});
export const comTeamTask_recoil = atom<[]>({
  key: "comTeamTask_recoil",
  default: [], // 초기값 설정
});

export const workStyle_recoil = atom({
  key: "workStyle_recoil",
  default: "baby",
});

export const workStyleColor_recoil = atom({
  key: "workStyleColor_recoil",
  default: { main: "#89e3ec", sub: "#ffd82c" },
});

export const keywords_recoil = atom<string[]>({
  key: "keywords_recoil",
  default: [],
});

export const morningCount_recoil = atom({
  key: "morningCount_recoil",
  default: 9,
});

export const afternoonCount_recoil = atom({
  key: "afternoonCount_recoil",
  default: 14,
});

export const nightCount_recoil = atom({
  key: "nightCount_recoil",
  default: 7,
});

export const issueCount_recoil = atom({
  key: "issueCount_recoil",
  default: 20,
});

export const allCategoryCount_recoil = atom<{ [key: string]: number }>({
  key: "allCategoryCount_recoil",
  default: {},
});

export const taskCount_recoil = atom({
  key: "taskCount_recoil",
  default: 20,
});

export const err_recoil = atom({
  key: "err_recoil",
  default: [],
});
