import { useState, useEffect } from "react";
import { DefaultValue, useRecoilState } from "recoil";
import {
  DEFAULT_MINUTE,
  DEFAULT_SECOND,
  minuteAtom,
  secondAtom,
} from "./atoms";

export default function App() {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isPaused, setIsPuased] = useState(true);
  const [minute, setMinute] = useRecoilState(minuteAtom);
  const [second, setSecond] = useRecoilState(secondAtom);

  const toggleTimer = () => {
    if (isPaused) {
      const id = window.setInterval(() => {
        reduceOneSecond();
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
    setIsPuased((prev) => !prev);
  };

  const reduceOneSecond = () => {
    if (minute === 0 && second === 0) {
      setIsPuased(true);
      setMinute(DEFAULT_MINUTE);
      setSecond(DEFAULT_SECOND);
    } else if (second === 0) {
      setMinute((prev) => prev - 1);
      setSecond(59);
    } else {
      setSecond((prev) => prev - 1);
    }
  };

  return (
    <>
      <h1>Pomodoro</h1>
      <span>{String(minute).padStart(2, "0")}</span>
      <span>:</span>
      <span>{String(second).padStart(2, "0")}</span>
      <hr />
      <button onClick={toggleTimer}>{isPaused ? "start" : "paused"}</button>
      <hr />
      <span>0/4</span>
      <span>ROUND</span>
      <hr />
      <span>0/12</span>
      <span>GOAL</span>
    </>
  );
}
