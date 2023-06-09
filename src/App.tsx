import { useState } from "react";
import { useRecoilState } from "recoil";
import { timerAtom, DefaultTime, ITimer } from "./atoms";

export default function App() {
  const [isPaused, setIsPuased] = useState(true);
  const [timer, setTimer] = useRecoilState(timerAtom);

  const toggleTimer = () => setIsPuased((prev) => !prev);

  const reduceOneSecond = () => {
    if (timer.minutes === 0 && timer.seconds === 0) {
      setIsPuased(true);
      const initTimer: ITimer = {
        minutes: DefaultTime.MINUTES,
        seconds: DefaultTime.SECONDS,
      };
      setTimer(initTimer);
    } else if (timer.seconds === 0) {
      setTimer((current) => {
        const reducedMinute = current.minutes - 1;
        const newTimer: ITimer = {
          minutes: reducedMinute,
          seconds: 59,
        };
        return newTimer;
      });
    } else {
      setTimer((current) => {
        const reducedSecond = current.seconds - 1;
        const newTimer: ITimer = {
          minutes: current.minutes,
          seconds: reducedSecond,
        };
        return newTimer;
      });
    }
  };

  return (
    <>
      <h1>Pomodoro</h1>
      <span>{String(timer.minutes).padStart(2, "0")}</span>
      <span>:</span>
      <span>{String(timer.seconds).padStart(2, "0")}</span>
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
