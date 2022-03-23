import { useState, useEffect } from "react";

function Timer({ initialSeconds, totalSeconds, onChange, interval, isTimer, setIsTimer }) {
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
    if (isTimer) {
      setElapsed(0);
      start(intervalId);
    }
  }, [isTimer]);

  const start = (intervalId) => {
    let time = 0;
    clear(intervalId);
    const newIntervalId = setInterval(() => {
      if (time + initialSeconds === totalSeconds) {
        setIsTimer(false);
        clear(newIntervalId);
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
