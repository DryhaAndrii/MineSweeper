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
  if (!records)
    return (
      <div
        className='recordsPanel'
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Unable to load records
        <button className='hideButton' onClick={hideButtonHandler}>
          ✖
        </button>
      </div>
    );
  if (records.length === 0) {
    return (
      <div
        className='recordsPanel'
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        No records
        <button className='hideButton' onClick={hideButtonHandler}>
          ✖
        </button>
      </div>
    );
  }
  return (
    <div className='recordsPanel'>
      <button className='hideButton' onClick={hideButtonHandler}>
        ✖
      </button>
      <div className='difficultButtons'>
        <button
          onClick={() => {
            setDifficult('easy');
          }}
        >
          Easy
        </button>
        <button
          onClick={() => {
            setDifficult('medium');
          }}
        >
          Medium
        </button>
        <button
          onClick={() => {
            setDifficult('hard');
          }}
        >
          Hard
        </button>
      </div>
      <div className='recordsList'>
        <div className='types'>
          <div className='nick'>Nick name</div>
          <div className='difficult'>Difficult</div>
          <div className='time'>Time</div>
          <div className='created'>Created</div>
        </div>
        {records.map((record, index) => {
          if (record.difficult === difficult) {
            return (
              <Record
                key={index}
                nickName={record.nickName}
                difficult={record.difficult}
                time={record.time}
                createdAt={record.createdAt}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default RecordsPanel;
