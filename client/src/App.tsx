import React, { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/redux';
import { minesweeperSlice } from './store/reducers/MinesweeperSlice';
import Field from './components/field/field';
import DifficultPanel from './components/difficultPanel/difficultPanel';
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setInterval(() => {
      dispatch(minesweeperSlice.actions.incTimer());
    }, 1000);
  }, []);
  return (
    <div className='minesweeper'>
      <DifficultPanel></DifficultPanel>

      <Field></Field>
    </div>
  );
}

export default App;
