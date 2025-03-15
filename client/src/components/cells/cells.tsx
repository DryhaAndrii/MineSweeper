import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import Cell from '../cell/cell';
import { createCellsArray } from './helpers/createCellsArray';
import { openCellById } from './helpers/openCellById';
import { countMinesAround } from './helpers/countMinesAround';
import { openCellsAround } from './helpers/openCellsAround';
import { findNotOpenedCells } from './helpers/findNotOpenedCells';
import { countOpenedCells } from './helpers/countOpenedCells';
import { setFlagById } from './helpers/setFlagById';
import { countFlagsAround } from './helpers/countFlagsAround';
import { openMines } from './helpers/openMines';
import { countFlagsCount } from './helpers/countFlagsCount';
import './cells.scss';

function Cells() {
  const dispatch = useAppDispatch();
  const { countOfMines, height, width, cells } = useAppSelector(
    (state) => state.minesweeperReducer,
  );

  const cellsRef = useRef([]);

  useEffect(() => {
    cellsRef.current = cells;
    console.log('ENVS:', import.meta.env.VITE_APP_API_URL);
  }, [cells]);

  useEffect(() => {
    // Запустили штуку которая смотрит есть ли не открытые клетки, и если они есть она их открывает
    const intervalId = setInterval(() => {
      const notOpenedCells = findNotOpenedCells(cellsRef.current);

      if (notOpenedCells.length > 0) {
        dispatch(minesweeperSlice.actions.setLoading(true));
        const newCells = openCellsAround(
          cellsRef.current,
          notOpenedCells[0].rowIndex,
          notOpenedCells[0].cellIndex,
        );

        dispatch(minesweeperSlice.actions.setCells(newCells));
      } else if (notOpenedCells.length === 0) {
        dispatch(minesweeperSlice.actions.setLoading(false));
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

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

  // Юзэфект ждет когда поменяется поле и считает количество открытых клеток и флагов
  useEffect(() => {
    dispatch(minesweeperSlice.actions.setOpenedCells(countOpenedCells(cells)));
    dispatch(minesweeperSlice.actions.setFlagsCount(countFlagsCount(cells)));
  }, [cells]);

  function cellLeftClick(id: number) {
    const newCells = openCellById(cells, id);

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
