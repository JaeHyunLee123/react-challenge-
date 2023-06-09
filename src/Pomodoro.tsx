import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { DEFAULT_TIME, timeAtom } from "./atoms";
import styled from "styled-components";

const TOTAL_ROUND = 4;
const TOTAL_GOAL = 12;

const FlexColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WholeWrapper = styled(FlexColumnWrapper)`
  height: 100vh;
  width: 100vw;
  background-color: tomato;
  color: whitesmoke;
`;

const TimeWrapper = styled(FlexRowWrapper)`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 80px;
  margin: 30px 0px;
  text-align: center;
  margin-bottom: 100px;
`;

const Time = styled(FlexRowWrapper)`
  width: 250px;
  height: 400px;
  border-radius: 30px;
  background-color: whitesmoke;

  span {
    color: tomato;
    font-size: 100px;
  }
`;

const Colon = styled(FlexColumnWrapper)`
  display: flex;
  padding: 0;
  margin: 0px 5px;
  div {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #fac1bb;
    margin: 10px 0px;
  }
`;

const RoundAndGoal = styled(FlexColumnWrapper)`
  margin: 15px 15px;
  span {
    font-size: 30px;
    margin: 5px 0px;
    &:first-child {
      color: #fac1bb;
    }
  }
`;

const Svg = styled.svg`
  width: 100px;
  height: 100px;
`;

export default function Pomodoro() {
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
    <WholeWrapper>
      <Title>Pomodoro</Title>
      <TimeWrapper>
        <Time>
          <span>{String(getMinutes(time)).padStart(2, "0")}</span>
        </Time>
        <Colon>
          <div />
          <div />
        </Colon>
        <Time>
          <span>{String(getSeconds(time)).padStart(2, "0")}</span>
        </Time>
      </TimeWrapper>

      {isPaused ? (
        <Svg
          onClick={toggleTimer}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
          ></path>
        </Svg>
      ) : (
        <Svg
          onClick={toggleTimer}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5zm4 0a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5z"
          ></path>
        </Svg>
      )}

      <FlexRowWrapper>
        <RoundAndGoal>
          <span>{`${round}/${TOTAL_ROUND}`}</span>
          <span>ROUND</span>
        </RoundAndGoal>
        <RoundAndGoal>
          <span>{`${goal}/${TOTAL_GOAL}`}</span>
          <span>GOAL</span>
        </RoundAndGoal>
      </FlexRowWrapper>
    </WholeWrapper>
  );
}
