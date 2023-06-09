import { useState } from "react";
import { useRecoilState } from "recoil";
import { DEFAULT_TIME, timeAtom } from "./atoms";

export default function App() {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useRecoilState(timeAtom);

  const toggleTimer = () => {
    if (isPaused) {
      const id = window.setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
    setIsPaused((prev) => !prev);
  };

  const getMinutes = (time: number) => Math.floor(time / 60);
  const getSeconds = (time: number) => time % 60;

  return (
    <>
      <h1>Pomodoro</h1>
      <span>{String(getMinutes(time)).padStart(2, "0")}</span>
      <span>:</span>
      <span>{String(getSeconds(time)).padStart(2, "0")}</span>
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
