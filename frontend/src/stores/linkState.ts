import { atom } from "recoil";

export const linkState = atom<string[]>({
  key: "linkState",
  default: [],
});


export const filesAtom = atom<{ url: string; name: string; size: number }[]>({
  key: 'files',
  default: [],
});



export const imagesAtom = atom<string[]>({
  key: 'images',
  default: [],
});


export const videosAtom = atom<string[]>({
  key: 'videos',
  default: [],
});