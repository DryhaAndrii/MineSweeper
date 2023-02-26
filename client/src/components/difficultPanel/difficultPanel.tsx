import React from 'react';
import { useAppDispatch } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './difficultPanel.scss';
function DifficultPanel() {
  const dispatch = useAppDispatch();
  function easyButton() {
    dispatch(minesweeperSlice.actions.setHeight(9));
    dispatch(minesweeperSlice.actions.setWidth(9));
    dispatch(minesweeperSlice.actions.setCountOfMines(9));
    dispatch(minesweeperSlice.actions.renewTimer());
  }
  function mediumButton() {
    dispatch(minesweeperSlice.actions.setHeight(16));
    dispatch(minesweeperSlice.actions.setWidth(16));
    dispatch(minesweeperSlice.actions.setCountOfMines(40));
    dispatch(minesweeperSlice.actions.renewTimer());
  }
  function hardButton() {
    dispatch(minesweeperSlice.actions.setHeight(16));
    dispatch(minesweeperSlice.actions.setWidth(30));
    dispatch(minesweeperSlice.actions.setCountOfMines(99));
    dispatch(minesweeperSlice.actions.renewTimer());
  }
  return (
    <div className='difficultPanelWrapper'>
      <button onClick={easyButton}>Easy</button>
      <button onClick={mediumButton}>Normal</button>
      <button onClick={hardButton}>Hard</button>
    </div>
  );
}

export default DifficultPanel;
