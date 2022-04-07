import { useState, useEffect } from "react";

function Timer({ initialSeconds, totalSeconds, onChange, interval, isTimer, setIsTimer, end }) {
  const [elapsed, setElapsed] = useState(initialSeconds); //경과된 시간
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    // start(intervalId);
    return () => clear(intervalId);
  }, []);

  useEffect(() => {
    onChange?.(elapsed);
  }, [elapsed]);

  useEffect(() => {
    setElapsed(0);
    if (isTimer) {
      start(intervalId);
    }
  }, [isTimer]);

  const start = (intervalId) => {
    let time = 0;
    clear(intervalId);
    const newIntervalId = setInterval(() => {
      // console.log(time, initialSeconds, time + initialSeconds, totalSeconds);
      if (time + initialSeconds === Number(totalSeconds)) {
        setIsTimer(false);
        clear(newIntervalId);
        if (end) end();
        return;
      }
      time++;
      setElapsed((current) => current + 1);
      setIntervalId(newIntervalId);
    }, interval);
  };

  const clear = (intervalId) => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  };

  return null;
}

export default Timer;
