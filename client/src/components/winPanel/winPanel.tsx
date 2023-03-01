import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './winPanel.scss';
function WinPanel() {
  const dispatch = useAppDispatch();
  const { timer, countOfMines, height, width, FlagsCoordinates, openedCells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );
  const [winTime, setWinTime] = useState(0);

  useEffect(() => {
    setWinTime(timer);
  }, []);

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
    <div className='winPanel'>
      <p>you win!!!</p>
      <p>time:{winTime} seconds</p>
      <button onClick={renew}>restart</button>
    </div>
  );
}

export default WinPanel;
