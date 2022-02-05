import * as React from 'react';
import './styles.css';
import { PomodoroTimer } from '../../components/PomodoroTimer';
import { Statistics } from '../../components/Statistics';

interface AppProps {
}

export const App: React.FC<AppProps> = (props) =>
  <main className='app'>
    <h1>Tomatodata</h1>
    <PomodoroTimer duration={10000} />
    <Statistics />
  </main>;
