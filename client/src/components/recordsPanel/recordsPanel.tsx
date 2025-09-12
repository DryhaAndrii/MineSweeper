import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './recordsPanel.scss';
import Record from './record';

interface record {
  nickName: string;
  difficult: string;
  time: string;
  createdAt: string;
}

interface ImportMetaEnv {
  VITE_APP_API_URL: string;
}

interface ImportMetaWithEnv extends ImportMeta {
  env: ImportMetaEnv;
}

function RecordsPanel() {
  const dispatch = useAppDispatch();

  const [difficult, setDifficult] = useState('easy');
  const [records, setRecords] = useState<Array<record> | null>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getRecords();
  }, []);

  async function getRecords() {
    try {
      const response: any = await axios.get(
        `${(import.meta as ImportMetaWithEnv).env.VITE_APP_API_URL}/records`,
      );
      const sortedRecords = response.data;
      sortedRecords.sort((a: record, b: record) => {
        const timeA = parseInt(a.time);
        const timeB = parseInt(b.time);
        return timeA - timeB;
      });
      setRecords(sortedRecords);
    } catch (error) {
      setRecords(null);
      setMessage('Error while getting records');
      console.error(error);
    }
  }

  function hideButtonHandler() {
    dispatch(minesweeperSlice.actions.setShowRecords(false));
  }

  const filteredRecords = records?.filter((record) => record.difficult === difficult) || [];

  if (!records) {
    return (
      <div className='recordsPanel'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='title'>
              <span className='trophy-icon'>🏆</span>
              Records
            </div>
            <button className='close-button' onClick={hideButtonHandler}>
              ✖
            </button>
          </div>
          <div className='error-state'>
            <div className='error-icon'>⚠️</div>
            <div className='error-title'>Unable to load records</div>
            <div className='error-subtitle'>Please check your connection and try again</div>
          </div>
        </div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className='recordsPanel'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div className='title'>
              <span className='trophy-icon'>🏆</span>
              Records
            </div>
            <button className='close-button' onClick={hideButtonHandler}>
              ✖
            </button>
          </div>
          <div className='empty-state'>
            <div className='empty-icon'>📊</div>
            <div className='empty-title'>No records yet</div>
            <div className='empty-subtitle'>Play some games to see your best times here!</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='recordsPanel'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='title'>
            <span className='trophy-icon'>🏆</span>
            Records
          </div>
          <button className='close-button' onClick={hideButtonHandler}>
            ✖
          </button>
        </div>

        <div className='difficult-buttons'>
          <button
            className={difficult === 'easy' ? 'active' : ''}
            onClick={() => setDifficult('easy')}
          >
            Easy
          </button>
          <button
            className={difficult === 'medium' ? 'active' : ''}
            onClick={() => setDifficult('medium')}
          >
            Medium
          </button>
          <button
            className={difficult === 'hard' ? 'active' : ''}
            onClick={() => setDifficult('hard')}
          >
            Hard
          </button>
        </div>

        {filteredRecords.length === 0 ? (
          <div className='empty-state'>
            <div className='empty-icon'>🎯</div>
            <div className='empty-title'>No {difficult} records</div>
            <div className='empty-subtitle'>
              Try playing on {difficult} difficulty to set a record!
            </div>
          </div>
        ) : (
          <div className='records-list'>
            <div className='table-header'>
              <div className='header-cell nick'>Player</div>
              <div className='header-cell difficult'>Level</div>
              <div className='header-cell time'>Time</div>
              <div className='header-cell created'>Date</div>
            </div>
            {filteredRecords.map((record, index) => (
              <Record
                key={index}
                nickName={record.nickName}
                difficult={record.difficult}
                time={record.time}
                createdAt={record.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordsPanel;
