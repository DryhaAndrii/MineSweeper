import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './difficultPanel.scss';

function DifficultPanel() {
  const dispatch = useAppDispatch();
  const { height, width, countOfMines } = useAppSelector((state) => state.minesweeperReducer);

  function easyButton() {
    dispatch(minesweeperSlice.actions.setHeight(9));
    dispatch(minesweeperSlice.actions.setWidth(9));
    dispatch(minesweeperSlice.actions.setCountOfMines(10));
    dispatch(minesweeperSlice.actions.setTimer(0));
  }

  function mediumButton() {
    dispatch(minesweeperSlice.actions.setHeight(16));
    dispatch(minesweeperSlice.actions.setWidth(16));
    dispatch(minesweeperSlice.actions.setCountOfMines(40));
    dispatch(minesweeperSlice.actions.setTimer(0));
  }

  function hardButton() {
    dispatch(minesweeperSlice.actions.setHeight(16));
    dispatch(minesweeperSlice.actions.setWidth(30));
    dispatch(minesweeperSlice.actions.setCountOfMines(99));
    dispatch(minesweeperSlice.actions.setTimer(0));
  }

  const getActiveClass = (h: number, w: number, mines: number) => {
    return height === h && width === w && countOfMines === mines ? 'active' : '';
  };

  return (
    <div className='difficultPanelWrapper'>
      <button className={getActiveClass(9, 9, 10)} onClick={easyButton}>
        Beginner
      </button>
      <button className={getActiveClass(16, 16, 40)} onClick={mediumButton}>
        Intermediate
      </button>
      <button className={getActiveClass(16, 30, 99)} onClick={hardButton}>
        Expert
      </button>
    </div>
  );
}

export default DifficultPanel;
