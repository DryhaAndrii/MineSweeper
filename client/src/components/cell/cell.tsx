import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';

import FlagSvg from '../svgIcons/FlagSvg';
import BombSvg from '../svgIcons/BombSvg';

interface myState {
  id: number;
  flag: boolean;
  cellIndex: number;
  rowIndex: number;
  mine: boolean;
  opened: boolean;
  cellLeftClick: (id: number) => void;
  cellRightClick: (id: number) => void;
  minesAround: number;
  cellDigitClick: (minesAround: number, cellIndex: number, rowIndex: number) => void;
  onMineOpen: () => void;
}

function Cell({
  cellIndex,
  rowIndex,
  id,
  mine,
  opened,
  cellLeftClick,
  cellRightClick,
  minesAround,
  flag,
  cellDigitClick,
  onMineOpen,
}: myState) {
  const [className, setClassName] = useState('cell');
  const [mines, setMines] = useState(0);
  const dispatch = useAppDispatch();
  const { loading, win, lose } = useAppSelector((state) => state.minesweeperReducer);

  useEffect(() => {
    if (opened) {
      if (mine) {
        dispatch(minesweeperSlice.actions.setLose(true));
        setClassName('mine');
        onMineOpen();
      }
      if (!mine) {
        if (minesAround > 0) {
          setMines(minesAround);
          setClassName(`minesAround _${minesAround}`);
        }
        if (minesAround === 0) {
          setClassName('empty');
        }
      }
    }
    if (!opened) {
      setClassName('cell');
      setMines(0);
    }
    if (flag) {
      setClassName('flag');
    }
  }, [opened, minesAround, flag]);

  return (
    <div
      className={`${className}`}
      draggable={false}
      onClick={() => {
        if (win === false && lose === false) {
          if (!loading) {
            if (!flag) {
              cellLeftClick(id);
            }
            if (minesAround > 0) {
              if (opened) {
                cellDigitClick(minesAround, cellIndex, rowIndex);
              }
            }
          }
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (win === false && lose === false) {
          if (!loading) {
            if (opened === false) {
              cellRightClick(id);
            }
          }
        }
      }}
    >
      {mines > 0 && mines}
      {flag && <FlagSvg />}
      {className === 'mine' && <BombSvg />}
    </div>
  );
}

export default Cell;
