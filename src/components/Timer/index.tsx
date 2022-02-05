import * as React from 'react';
import './styles.css';
import { useCallback, useState } from 'react';

const MINUTE = 60 * 1000;

interface TimerProps {
  duration?: number;
}

type TimerState = 'idle' | 'in-progress' | 'completed';

export const Timer: React.FC<TimerProps> = ({ duration = 0.16 * MINUTE }) => {
  const [state, setState] = useState<TimerState>('idle');

  const handleStart = useCallback(() => {
    setState('in-progress');
  });
  const handleCancel = useCallback(() => {
    setState('idle');
  });
  const handleComplete = useCallback(() => {
    setState('idle');
  });

  return <div className='timer'>
    <h2>Current pomodoro</h2>
    {state}
    {state === 'idle' && <>
      <button onClick={handleStart}>Start</button>
    </>}
    {state === 'in-progress' && <>
      <span>time left: value</span>
      <button onClick={handleCancel}>Cancel</button>
    </>}
    {state === 'completed' && <>
      <input placeholder='Task: details' />
      <button onClick={handleComplete}>Complete</button>
    </>}
  </div>;
};

Timer.displayName = 'Timer';
