import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import axios from 'axios';
import './winPanel.scss';
import Message from './message';
function WinPanel() {
  const dispatch = useAppDispatch();
  const { timer, countOfMines, height, width, FlagsCoordinates, openedCells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );
  const [winTime, setWinTime] = useState(0);
  const [nickName, setNickName] = useState('');
  const [difficult, setDifficult] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    setWinTime(timer);
    if (countOfMines === 9) {
      setDifficult('easy');
    }
    if (countOfMines === 40) {
      setDifficult('medium');
    }
    if (countOfMines === 99) {
      setDifficult('hard');
    }
  }, []);

  async function saveRecord() {
    try {
      if (!/^[a-zA-Z0-9]+$/.test(nickName) || nickName.length > 20 || nickName.length<2) {
        setShowMessage(true);
        return;
      }
      
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/records`, {
        nickName: nickName,
        time: `${winTime}`,
        difficult: difficult,
      });
      console.log(response.data);
      dispatch(minesweeperSlice.actions.setWin(false));
      dispatch(minesweeperSlice.actions.setShowRecords(true));
    } catch (error) {
      console.error(error);
    }
  }

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

  function hideMessage() {
    setShowMessage(false);
  }
  return (
    <div className='winPanel'>
      <p>You win!!!</p>
      <p>Time:{winTime} seconds</p>
      <input
        type='text'
        placeholder='Your name...'
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      ></input>
      <button onClick={saveRecord}>Save result</button>
      <button onClick={renew}>Restart</button>
      {showMessage && <Message message={'Nickname can only contain Latin letters and numbers, their number cannot be less than 2 and more than 20'} hideMessage={hideMessage} />}
    </div>
  );
}

export default WinPanel;
