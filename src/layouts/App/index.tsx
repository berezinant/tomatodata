import * as React from 'react';
import './styles.css';
import { Timer } from '../../components/Timer';
import { Statistics } from '../../components/Statistics';

interface AppProps {
}

export const App: React.FC<AppProps> = (props) =>
  <main className='app'>
    <h1>Tomatodata</h1>
    <Timer />
    <Statistics />
  </main>;
