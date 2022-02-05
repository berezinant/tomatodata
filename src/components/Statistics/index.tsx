import * as React from 'react';
import './styles.css';

interface StatisticsProps {
}

export const Statistics: React.FC<StatisticsProps> = (props) => (
  <div className='statistics'>Statistics</div>
);

Statistics.displayName = 'Statistics';
