import { useEffect, useState } from "react";

const useStopwatch = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [intervalId, setIntervalId] = useState<any>(null);

  useEffect(() => {
    if (timeLeft === 0) {
      pauseTimer();
      clearInterval(intervalId);
      return;
    }

    const interval = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((timeLeft) => timeLeft - 1);
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
