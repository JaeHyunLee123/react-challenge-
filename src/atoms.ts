import { atom } from "recoil";

export const DEFAULT_TIME = 2;

export const timeAtom = atom({
  key: "pomodorotime",
  default: DEFAULT_TIME,
});
