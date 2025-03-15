import React, { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './infoPanel.scss';
function InfoPanel() {
  const dispatch = useAppDispatch();
  const { timer, countOfMines, height, width, flagsCount, openedCells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );

  const [count, setCount] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Запускаем таймер
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      dispatch(minesweeperSlice.actions.setTimer(count));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [count]);

  // Обнуляем таймер
  useEffect(() => {
    if (timer === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCount(1);

      intervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
        dispatch(minesweeperSlice.actions.setTimer(count));
      }, 1000);
    }
  }, [timer]);

  // Юзэфект который проверяет не победили ли мы
  useEffect(() => {
    if (height * width - countOfMines - openedCells === 0) {
      dispatch(minesweeperSlice.actions.setWin(true));
    }
  }, [openedCells]);

  function renew() {
    const oldMines = countOfMines;
    const oldHeight = height;
    const oldWidth = width;
    dispatch(minesweeperSlice.actions.setCountOfMines(0));
    dispatch(minesweeperSlice.actions.setHeight(0));
    dispatch(minesweeperSlice.actions.setWidth(0));
    setTimeout(() => {
      dispatch(minesweeperSlice.actions.setCountOfMines(oldMines));
      dispatch(minesweeperSlice.actions.setHeight(oldHeight));
      dispatch(minesweeperSlice.actions.setWidth(oldWidth));
      dispatch(minesweeperSlice.actions.setTimer(0));
    }, 1);
  }

  return (
    <div className='infoPanelWrapper'>
      <p className='countOfMines'>mines left: {countOfMines - flagsCount}</p>
      <button onClick={renew}>restart</button>
      <p className='timer'>timer: {timer}</p>
    </div>
  );
}

export default InfoPanel;
