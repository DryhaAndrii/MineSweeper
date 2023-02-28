import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './infoPanel.scss';
function InfoPanel() {
  const dispatch = useAppDispatch();
  const { timer, countOfMines, height, width, FlagsCoordinates, openedCells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );
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
    }, 1);
  }
  return (
    <div className='infoPanelWrapper'>
      <p className='countOfMines'>
        mines left: {countOfMines - FlagsCoordinates.length}, cells opened:{openedCells}, cells
        remain:{height * width - countOfMines - openedCells}
      </p>
      <button onClick={renew}>renew</button>
      <p className='timer'>{timer}</p>
    </div>
  );
}

export default InfoPanel;
