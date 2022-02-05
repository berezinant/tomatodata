import * as React from 'react';
import './styles.css';

export type Pomodoro = {
  startedAt: number;
  duration: number;
  text: string;
  task: string;
  details?: string;
};

interface PomodoroProps {
  pomodoro: Pomodoro;
}

export const Pomodoro: React.FC<PomodoroProps> = ({ pomodoro }) => (
  <div className='pomodoro'>🍅 {pomodoro.text}</div>
);

Pomodoro.displayName = 'Pomodoro';
