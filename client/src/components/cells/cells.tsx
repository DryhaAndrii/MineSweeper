import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import Cell from '../cell/cell';
import { createCellsArray } from './helpers/createCellsArray';
import { updateArrayById } from './helpers/updateArrayById';
import './cells.scss';

function Cells() {
  const dispatch = useAppDispatch();
  const { countOfMines, height, width, cells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );
  useEffect(() => {
    const cells = createCellsArray(width, height, countOfMines);
    dispatch(minesweeperSlice.actions.setCells(cells));
  }, [countOfMines]);

  function cellLeftClick(id: number) {
    const newCells = updateArrayById(cells, id);

    dispatch(minesweeperSlice.actions.setCells(newCells));
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
