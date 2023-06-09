import { atom } from "recoil";

export const DEFAULT_MINUTE = 25;
export const DEFAULT_SECOND = 0;

export const minuteAtom = atom({
  key: "minute",
  default: DEFAULT_MINUTE,
});

export const secondAtom = atom({
  key: "second",
  default: DEFAULT_SECOND,
});
