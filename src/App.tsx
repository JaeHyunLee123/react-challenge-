import { useState } from "react";

export default function App() {
  const [isPaused, setIsPuased] = useState(true);

  const toggleTimer = () => setIsPuased((prev) => !prev);

  return (
    <>
      <h1>Pomodoro</h1>
      <span>25</span>
      <span>:</span>
      <span>00</span>
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
