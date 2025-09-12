import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './losePanel.scss';
function LosePanel() {
  const dispatch = useAppDispatch();
  const { countOfMines, height, width } = useAppSelector((state) => state.minesweeperReducer);
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
    <div className='losePanel'>
      <div className='modal-content'>
        <div className='lose-icon'>💥</div>
        <h2 className='lose-title'>Game Over!</h2>
        <p className='lose-subtitle'>Better luck next time!</p>
        <button onClick={renew}>Try Again</button>
      </div>
    </div>
  );
}

export default LosePanel;
