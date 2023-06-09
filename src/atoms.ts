import { atom } from "recoil";

export const DEFAULT_TIME = 25 * 60;

export const timeAtom = atom({
  key: "minute",
  default: DEFAULT_TIME,
});
