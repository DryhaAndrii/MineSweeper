import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import axios from 'axios';
import './winPanel.scss';
import Message from './message';

interface ImportMetaEnv {
  VITE_APP_API_URL: string;
}

interface ImportMetaWithEnv extends ImportMeta {
  env: ImportMetaEnv;
}

function WinPanel() {
  const dispatch = useAppDispatch();
  const { timer, countOfMines, height, width } = useAppSelector(
    (state) => state.minesweeperReducer,
  );
  const [winTime, setWinTime] = useState(0);
  const [nickName, setNickName] = useState('');
  const [difficult, setDifficult] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
      if (!/^[a-zA-Z0-9]+$/.test(nickName) || nickName.length > 20 || nickName.length < 2) {
        setMessage(
          'Nickname can only contain Latin letters and numbers, their number cannot be less than 2 and more than 20',
        );
        setShowMessage(true);
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `${(import.meta as ImportMetaWithEnv).env.VITE_APP_API_URL}/records`,
        {
          nickName: nickName,
          time: `${winTime}`,
          difficult: difficult,
        },
      );
      console.log(response.data);
      setLoading(false);
      dispatch(minesweeperSlice.actions.setWin(false));
      dispatch(minesweeperSlice.actions.setShowRecords(true));
    } catch (error) {
      setMessage(
        'Some error occurred while saving the record, you can try again or restart game to play without saving record',
      );
      setShowMessage(true);
      console.error('Error saving record: ', error);
      setLoading(false);
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
    setMessage('');
  }
  return (
    <div className='winPanel'>
      <div className='modal-content'>
        <div className='win-icon'>🎉</div>
        <h2 className='win-title'>Congratulations!</h2>
        <p className='win-subtitle'>You completed the game in {winTime} seconds</p>

        <div className='score-form'>
          <input
            type='text'
            placeholder='Enter your name...'
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <button onClick={saveRecord} disabled={loading}>
            {loading ? 'Saving...' : 'Save Record'}
          </button>
        </div>

        <button onClick={renew}>Play Again</button>

        {showMessage && <Message message={message} hideMessage={hideMessage} />}
      </div>
    </div>
  );
}

export default WinPanel;
