import * as React from 'react';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { addPomodoroToList, clearPomodoroStartedAt, getPomodoroStartedAt, setPomodoroStartedAt } from '../../storage';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

interface Timer {
  pomodoro: number | undefined,
  tick: number | undefined
};

const getPomodoroTimeLeft = ({ duration, startedAt }: { duration: number; startedAt?: number }): number => {
  const now = Date.now();
  const timePassed = startedAt ? now - startedAt : 0;
  const timeLeft = duration - timePassed;
  return timeLeft > 0 ? timeLeft : 0;
};

const startTimer =
  ({
     onStart = () => null,
     onTick,
     onComplete,
     duration,
     startedAt,
     tickPeriod = SECOND,
   }: {
    onStart?: () => void;
    onTick: () => void;
    onComplete: () => void;
    duration: number;
    startedAt?: number;
    tickPeriod?: number;
  }): Timer | undefined => {
    const timeLeft = getPomodoroTimeLeft({ duration, startedAt });
    if (timeLeft > 0) {
      onStart();
      return {
        pomodoro: setTimeout(onComplete, timeLeft),
        tick: setInterval(onTick, tickPeriod),
      };
    }
    return undefined;
  };


const cancelTimer = (timer: Timer) => {
  if (timer.pomodoro) {
    clearTimeout(timer.pomodoro);
  }
  if (timer.tick) {
    clearTimeout(timer.tick);
  }
};


type TimerState = 'idle' | 'in-progress' | 'completed';

interface PomodoroTimer {
  duration?: number;
  onComplete?: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimer> = ({ duration = 25 * MINUTE, onComplete = () => null }) => {
  let timer: Timer = { pomodoro: undefined, tick: undefined };

  const [state, setState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [task, setTask] = useState<string>('');

  useEffect(() => {
    const startedAt = getPomodoroStartedAt();
    if (startedAt) {
      timer = startTimer({
        duration,
        startedAt,
        onTick: () => setTimeLeft(getPomodoroTimeLeft({ duration, startedAt })),
        onComplete: () => setState('completed'),
      });
      if (timer) {
        setTimeLeft(getPomodoroTimeLeft({ duration, startedAt }));
        setState('in-progress');
      } else {
        setState('completed');
      }
    }
    return () => {
      if (timer) {
        cancelTimer(timer);
      }
    };
  }, []);

  const handleStart = useCallback(() => {
    const startedAt = Date.now();
    timer = startTimer(({
      duration,
      startedAt,
      onStart: () => setPomodoroStartedAt(startedAt),
      onTick: () => setTimeLeft(getPomodoroTimeLeft({ duration, startedAt })),
      onComplete: () => setState('completed'),
    }));
    setTimeLeft(getPomodoroTimeLeft({ duration, startedAt }));
    setState('in-progress');
  });

  const handleCancel = useCallback(() => {
    if (timer) {
      cancelTimer(timer);
    }
    clearPomodoroStartedAt();
    setState('idle');
  });

  const handleComplete = useCallback(() => {
    if (timer) {
      cancelTimer(timer);
    }
    addPomodoroToList({ startedAt: getPomodoroStartedAt(), duration, task, taskName: task });
    clearPomodoroStartedAt();
    setState('idle');
    setTask('');
    onComplete();
  });

  return (
    <div className='timer'>
      <h2>
        Current pomodoro
      </h2>
      {state === 'idle' && (
        <>
          <button onClick={handleStart}>Start</button>
        </>
      )}
      {state === 'in-progress' && (
        <>
          <span>Time left: {timeLeft}</span>&nbsp;
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
      {state === 'completed' && (
        <>
          <input
            name='pomodoro'
            placeholder='Task: details'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          &nbsp;
          <button onClick={handleComplete} disabled={!task}>Complete</button>
        </>
      )}
    </div>
  );
};

PomodoroTimer.displayName = 'PomodoroTimer';
