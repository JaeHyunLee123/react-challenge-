import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { DEFAULT_TIME, timeAtom } from "./atoms";

const TOTAL_ROUND = 4;
const TOTAL_GOAL = 12;

export default function App() {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [round, setRound] = useState(0);
  const [goal, setGoal] = useState(0);
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

  useEffect(() => {
    if (time === 0) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setIsPaused(true);
      setTime(DEFAULT_TIME);
      setRound((prev) => prev + 1);
    }
  }, [time]);

  useEffect(() => {
    if (round === TOTAL_ROUND) {
      setRound(0);
      setGoal((prev) => prev + 1);
    }
  }, [round]);

  useEffect(() => {
    if (goal === TOTAL_GOAL) {
      setGoal(0);
    }
  }, [goal]);

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
      <span>{`${round}/${TOTAL_ROUND}`}</span>
      <span>ROUND</span>
      <hr />
      <span>{`${goal}/${TOTAL_GOAL}`}</span>
      <span>GOAL</span>
    </>
  );
}
