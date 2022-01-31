import * as React from 'react';
import styles from './styles.module.css';

interface AppProps {
}

export const App: React.FC<AppProps> = (props) =>
  <main className={styles.app}>
    <h1>Tomatodata!</h1>
  </main>;
