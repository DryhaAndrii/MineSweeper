import InfoPanel from '../infoPanel/infoPanel';
import Cells from '../cells/cells';
import LosePanel from '../losePanel/losePanel';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import './field.scss';
import WinPanel from '../winPanel/winPanel';
import RecordsPanel from '../recordsPanel/recordsPanel';
import React from 'react';
function Field() {
  const { lose, win, showRecords } = useAppSelector((state) => state.minesweeperReducer);
  const dispatch = useAppDispatch();
  return (
    <div className='fieldWrapper'>
      <InfoPanel></InfoPanel>
      <Cells></Cells>
      {lose && <LosePanel />}
      {win && <WinPanel />}
      {showRecords && <RecordsPanel />}
      <button
        className='recordsButton'
        onClick={() => {
          dispatch(minesweeperSlice.actions.setShowRecords(true));
        }}
      >
        Show records
      </button>
    </div>
  );
}

export default Field;
