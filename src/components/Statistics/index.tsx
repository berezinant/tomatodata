import * as React from 'react';
import './styles.css';
import { Pomodoro } from '../../entities/Pomodoro';
import { getPomodoroList } from '../../storage';

interface StatisticsProps {
}

export const Statistics: React.FC<StatisticsProps> = (props) => {
  const pomodoroList = getPomodoroList();
  return (
    <div className='statistics'>
      <h2>Statistics</h2>
      {pomodoroList.length > 0 ?
        <ul>
          {getPomodoroList().map(
            (pomodoro) => <li key={pomodoro.startedAt}><Pomodoro pomodoro={pomodoro} /></li>,
          )}
        </ul>
        : <small>Empty</small>}
    </div>
  );
};

Statistics.displayName = 'Statistics';
