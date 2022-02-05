import * as React from 'react';
import './styles.css';

export type PomodoroDto = {
  startedAt: number;
  duration: number;
  task: string;
  taskName: string;
  taskDetails?: string;
};

interface PomodoroProps {
  pomodoro: PomodoroDto;
  amount?: number;
}

export const Pomodoro: React.FC<PomodoroProps> = ({ pomodoro, amount = 1 }) => (
  <div className='pomodoro'>
    <div className='pomodoro__name'>{pomodoro.task}</div>
    <div>{[...new Array(amount)].map((_, i) => <React.Fragment key={i}>🍅</React.Fragment>)}</div>
  </div>
);

Pomodoro.displayName = 'Pomodoro';
