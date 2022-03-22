import { useState, useEffect } from "react";

function Timer({ initialSeconds, totalSeconds, onChange, interval }) {
  const [elapsed, setElapsed] = useState(initialSeconds); //경과된 시간
  const [intervalId, setIntervalId] = useState(0);
  let time = initialSeconds;

  useEffect(() => {
    start(intervalId);
    return () => clear(intervalId);
  }, []);

  useEffect(() => {
    onChange?.(elapsed);
  }, [elapsed]);

  const start = (intervalId) => {
    clear(intervalId);
    const newIntervalId = setInterval(() => {
      if (time === totalSeconds) {
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
