import { atom, selector } from "recoil";

const DEFAULT_MINUTES = 25;
const DEFAULT_SECONDS = 0;

export enum DefaultTime {
  "MINUTES" = 25,
  "SECONDS" = 0,
}

export interface ITimer {
  minutes: number;
  seconds: number;
}

export const timerAtom = atom<ITimer>({
  key: "timer",
  default: { minutes: DefaultTime.MINUTES, seconds: DefaultTime.SECONDS },
});
