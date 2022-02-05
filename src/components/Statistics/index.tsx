import * as React from 'react';
import './styles.css';
import { Pomodoro } from '../../entities/Pomodoro';
import { getPomodoroList } from '../../storage';

interface StatisticsProps {
}

export const Statistics: React.FC<StatisticsProps> = (props) => {
  const pomodoroList = getPomodoroList();
  const amounts = pomodoroList.reduce((acc, curr) => {
    if (!acc[curr.task]) {
      acc[curr.task] = 1;
    } else {
      acc[curr.task] += 1;
    }
    return acc;
  }, {} as Record<string, number>);
  return (
    <div className='statistics'>
      <h2>Statistics</h2>
      {pomodoroList.length > 0 ?
        <ul>
          {Object.keys(amounts).map(
            (task, i) => {
              const pomodoro = pomodoroList.find((p) => p.task === task);
              return <li key={task}><Pomodoro pomodoro={pomodoro} amount={amounts[task]} /></li>;
            },
          )}
        </ul>
        : <small>Empty</small>}
    </div>
  );
};

Statistics.displayName = 'Statistics';
