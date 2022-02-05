import { Pomodoro } from '../entities/Pomodoro';

const LS_POMODORO_STARTED_AT = 'LS_POMODORO_STARTED_AT';
const LS_POMODORO_LIST = 'LS_POMODORO_LIST';

export const getPomodoroList = (): Pomodoro[] => {
  const pomodoroList = localStorage.getItem(LS_POMODORO_LIST);
  return pomodoroList ? JSON.parse(pomodoroList) : [];
};

export const addPomodoroToList = (pomodoro: Pomodoro) => {
  const currentList = getPomodoroList();
  currentList.push(pomodoro);
  localStorage.setItem(LS_POMODORO_LIST, JSON.stringify(currentList));
};

export const getPomodoroStartedAt = (): number | undefined => {
  const startedAt = localStorage.getItem(LS_POMODORO_STARTED_AT);
  return startedAt ? Number(startedAt) : undefined;
};

export const setPomodoroStartedAt = (startedAt: number) => {
  localStorage.setItem(LS_POMODORO_STARTED_AT, `${startedAt}`);
};

export const clearPomodoroStartedAt = () => {
  localStorage.removeItem(LS_POMODORO_STARTED_AT);
};
