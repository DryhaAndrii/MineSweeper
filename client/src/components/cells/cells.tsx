import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import Cell from '../cell/cell';
import { createCellsArray } from './helpers/createCellsArray';
import { updateArrayById } from './helpers/updateArrayById';
import { countMinesAround } from './helpers/countMinesAround';
import { openCellsAround } from './helpers/openCellsAround';
import { findNotOpenedCells } from './helpers/findNotOpenedCells';
import './cells.scss';

function Cells() {
  const dispatch = useAppDispatch();
  const { countOfMines, height, width, cells, openedCells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );

  useEffect(() => {
    const cells = createCellsArray(width, height, countOfMines);

    cells.forEach((row) => {
      row.forEach((cell) => {
        const minesAround = countMinesAround(cells, cell.rowIndex, cell.cellIndex);
        cell.minesAround = minesAround;
      });
    });

    dispatch(minesweeperSlice.actions.setCells(cells));
  }, [countOfMines]);

  function cellLeftClick(id: number) {
    const newCells = updateArrayById(cells, id);

    dispatch(minesweeperSlice.actions.setCells(newCells));
  }

  function onEmptyCell(rowIndex: number, cellIndex: number) {
    const newCells = openCellsAround(cells, rowIndex, cellIndex);
    dispatch(minesweeperSlice.actions.setCells(newCells));
  }

  function findAllNotOpenedAndOpen() {
    const notOpenedCells = findNotOpenedCells(cells);
    console.log(notOpenedCells);
    if (notOpenedCells.length > 0) {
      notOpenedCells.forEach((cell) => {
        onEmptyCell(cell.rowIndex, cell.cellIndex);
      });
    }
  }

  return (
    <div className='cellsWrapper'>
      <button
        onClick={() => {
          findAllNotOpenedAndOpen();
        }}
      >
        open cells
      </button>
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
                  minesAround={cell.minesAround}
                  onEmptyCell={onEmptyCell}
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
