import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import { CellPositionsEnum, getCell } from './helpers/getCell';
import FlagSvg from '../svgIcons/FlagSvg';
import BombSvg from '../svgIcons/BombSvg';

interface myState {
  id: number;
  cellIndex: number;
  rowIndex: number;
  mine: boolean;
  opened: boolean;
  cellLeftClick: (id: number) => void;
}

function Cell({ cellIndex, rowIndex, id, mine, opened, cellLeftClick }: myState) {
  const [className, setClassName] = useState('cell');
  const [isFlag, setIsFlag] = useState(false);
  const [minesAround, setMinesAround] = useState(0);
  const dispatch = useAppDispatch();
  const { FlagsCoordinates, OpenedCells, height, width } = useAppSelector(
    (state) => state.minesweeperReducer,
  );

  useEffect(() => {
    if (opened) {
      if (mine) {
        setClassName('mine');
      } else {
        setClassName('empty');
      }
    }
  }, [opened]);

  return (
    <div
      className={`${className}`}
      draggable={false}
      onClick={() => {
        cellLeftClick(id);
      }}
    >
      {minesAround > 0 && minesAround}
      {isFlag && <FlagSvg />}
      {className === 'mine' && <BombSvg />}
    </div>
  );
}

export default Cell;
