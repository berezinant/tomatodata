import * as React from 'react';
import './styles.css';
import { PomodoroTimer } from '../../components/PomodoroTimer';
import { Statistics } from '../../components/Statistics';
import { useState } from 'react';

interface AppProps {
}

const generateRandomKey = (): string => Math.random().toString(16).slice(2, 7);

export const App: React.FC<AppProps> = (props) => {
  const [key, setKey] = useState<string>(generateRandomKey());
  return <main className='app'>
    <h1>Tomatodata</h1>
    <PomodoroTimer duration={10000} onComplete={() => setKey(generateRandomKey())} />
    <Statistics key={key} />
  </main>;
};
