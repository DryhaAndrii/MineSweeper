import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import Cell from '../cell/cell';
import { createCellsArray } from './helpers/createCellsArray';
import { openCellByIdRecursively } from './helpers/openCellsRecursively';
import { countMinesAround } from './helpers/countMinesAround';
import { openCellsAround } from './helpers/openCellsAround';
import { countOpenedCells } from './helpers/countOpenedCells';
import { setFlagById } from './helpers/setFlagById';
import { countFlagsAround } from './helpers/countFlagsAround';
import { openMines } from './helpers/openMines';
import { countFlagsCount } from './helpers/countFlagsCount';
import './cells.scss';
import { cellObject } from './helpers/types';

function Cells() {
  const dispatch = useAppDispatch();
  const { countOfMines, height, width, cells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );

  const cellsRef = useRef<cellObject[][]>([]);

  useEffect(() => {
    cellsRef.current = cells;
  }, [cells]);

  useEffect(() => {
    dispatch(minesweeperSlice.actions.setWin(false));
    dispatch(minesweeperSlice.actions.setLose(false));
    const cells = createCellsArray(width, height, countOfMines);

    cells.forEach((row) => {
      row.forEach((cell) => {
        const minesAround = countMinesAround(cells, cell.rowIndex, cell.cellIndex);
        cell.minesAround = minesAround;
      });
    });

    dispatch(minesweeperSlice.actions.setCells(cells));
  }, [countOfMines]);

  // useEffect waits for field changes and counts opened cells and flags
  useEffect(() => {
    dispatch(minesweeperSlice.actions.setOpenedCells(countOpenedCells(cells)));
    dispatch(minesweeperSlice.actions.setFlagsCount(countFlagsCount(cells)));
  }, [cells]);

  function cellLeftClick(id: number) {
    const newCells = openCellByIdRecursively(cells, id);

    dispatch(minesweeperSlice.actions.setCells(newCells));
  }
  function cellRightClick(id: number) {
    const newCells = setFlagById(cells, id);

    dispatch(minesweeperSlice.actions.setCells(newCells));
  }

  function cellDigitClick(minesAround: number, cellIndex: number, rowIndex: number) {
    const flagsAround = countFlagsAround(cells, rowIndex, cellIndex);
    if (flagsAround === minesAround) {
      const newCells = openCellsAround(cells, rowIndex, cellIndex);
      dispatch(minesweeperSlice.actions.setCells(newCells));
    }
  }
  function onMineOpen() {
    const newCells = openMines(cells);
    dispatch(minesweeperSlice.actions.setCells(newCells));
    dispatch(minesweeperSlice.actions.setLose(true));
  }

  return (
    <div className='cellsWrapper'>
      {cells.map((row, index) => {
        return (
          <div className='row' key={index}>
            {row.map((cell) => {
              return (
                <Cell
                  key={cell.id}
                  rowIndex={cell.rowIndex}
                  cellIndex={cell.cellIndex}
                  id={cell.id}
                  mine={cell.mine}
                  opened={cell.opened}
                  cellLeftClick={cellLeftClick}
                  cellRightClick={cellRightClick}
                  minesAround={cell.minesAround}
                  flag={cell.flag}
                  cellDigitClick={cellDigitClick}
                  onMineOpen={onMineOpen}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Cells;
