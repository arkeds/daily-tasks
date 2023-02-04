import { useEffect, useState } from "react";

const useStopwatch = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [intervalId, setIntervalId] = useState<any>(null);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalId);
      pauseTimer();
      return;
    }

    const interval = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((time) => time - 0.5);
      }
    }, 1000);
    setIntervalId(interval);

    return () => clearInterval(intervalId);
  }, [timeLeft, isPaused]);

  const pauseTimer = () => {
    console.log("Paused");
    setIsPaused(true);
  };

  const playTimer = () => {
    console.log("Play");
    setIsPaused(false);
  };

  const reset = () => {
    clearInterval(intervalId);
    pauseTimer();
    setTimeLeft(seconds);
  };

  return {
    seconds: timeLeft,
    pauseTimer,
    playTimer,
    reset,
  };
};

export default useStopwatch;
