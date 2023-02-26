import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { counterSlice } from '../../store/reducers/CounterSlice';
import InfoPanel from '../infoPanel/infoPanel';
import Mines from '../mines/mines';
import './field.scss';
function Field() {
  const [inputValue, setInputValue] = useState(0);
  const dispatch = useAppDispatch();
  // dispatch(counterSlice.actions.decrement(inputValue));
  // const { count } = useAppSelector((state) => state.counterReducer);
  // const dataToSend = {
  //   taskTitle: 'test title',
  //   deadLine: '2023-02-19T22:00:00.000Z',
  // };
  // const response = await axios.post('http://localhost:7070/todolist', dataToSend);

  return (
    <div className='fieldWrapper'>
      <InfoPanel></InfoPanel>
      <Mines></Mines>
    </div>
  );
}

export default Field;
