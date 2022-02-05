import * as React from 'react';
import './styles.css';

export type Pomodoro = {
  startedAt: number;
  duration: number;
  task: string;
};

interface PomodoroProps {
  pomodoro: Pomodoro;
}

export const Pomodoro: React.FC<PomodoroProps> = ({ pomodoro }) => (
  <div className='pomodoro'>🍅 {pomodoro.task}</div>
);

Pomodoro.displayName = 'Pomodoro';
