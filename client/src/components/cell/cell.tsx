import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';

import FlagSvg from '../svgIcons/FlagSvg';
import BombSvg from '../svgIcons/BombSvg';

interface myState {
  id: number;
  cellIndex: number;
  rowIndex: number;
  mine: boolean;
  opened: boolean;
  cellLeftClick: (id: number) => void;
  minesAround: number;
  onEmptyCell: (rowIndex: number, cellIndex: number) => void;
}

function Cell({
  cellIndex,
  rowIndex,
  id,
  mine,
  opened,
  cellLeftClick,
  minesAround,
  onEmptyCell,
}: myState) {
  const [className, setClassName] = useState('cell');
  const [isFlag, setIsFlag] = useState(false);
  const [mines, setMines] = useState(0);
  const dispatch = useAppDispatch();
  const { openedCells } = useAppSelector((state) => state.minesweeperReducer);

  useEffect(() => {
    if (opened) {
      if (mine) {
        setClassName('mine');
      }
      if (!mine) {
        if (minesAround > 0) {
          setMines(minesAround);
          setClassName(`minesAround _${minesAround}`);
        }
        if (minesAround === 0) {
          setClassName('empty');
          onEmptyCell(rowIndex, cellIndex);
        }
      }
    }
    if (!opened) {
      setClassName('cell');
      setMines(0);
    }
  }, [opened, minesAround]);

  return (
    <div
      className={`${className}`}
      draggable={false}
      onClick={() => {
        cellLeftClick(id);
      }}
    >
      {mines > 0 && mines}
      {isFlag && <FlagSvg />}
      {className === 'mine' && <BombSvg />}
    </div>
  );
}

export default Cell;
