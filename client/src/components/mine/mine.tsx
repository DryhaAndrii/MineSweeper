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
}

function Mine({ cellIndex, rowIndex }: myState) {
  const [className, setClassName] = useState('cell');
  const [isFlag, setIsFlag] = useState(false);
  const [minesAround, setMinesAround] = useState(0);
  const dispatch = useAppDispatch();
  const {
    MineCoordinates,
    CellsThatShouldBeChecked,
    FlagsCoordinates,
    OpenedCells,
    height,
    width,
  } = useAppSelector((state) => state.minesweeperReducer);
  useEffect(() => {
    if (className === 'cell') {
      const isFounded = CellsThatShouldBeChecked.find(
        (cell) => cell.cell === cellIndex && cell.rowIndex === rowIndex,
      );
      if (isFounded) {
        clickCell();
      }
    }
  }, [CellsThatShouldBeChecked]);

  function clickCell() {
    if (isFlag) {
      return;
    }
    if (className !== 'cell') {
      if (minesAround) {
        let flagsAround = 0;
        // Считаем количество флагов вокруг клетки, если количество флагов вокруг клетки = количеству мин вокруг то можно открывать все не помеченные флагом клетки вокруг нажатой клетки
        Object.values(CellPositionsEnum).forEach((value) => {
          const cell = getCell(value, cellIndex, rowIndex);
          if (
            FlagsCoordinates.find(
              (mine) => mine.cell === cell.cellIndex && mine.rowIndex === cell.rowIndex,
            )
          ) {
            flagsAround++;
          }
        });

        if (flagsAround === minesAround) {
          // логика открывания клеток вокруг
          const newCellsThatShouldBeChecked = [...CellsThatShouldBeChecked];

          Object.values(CellPositionsEnum).forEach((value) => {
            const cellPosition = getCell(value, cellIndex, rowIndex);
            if (
              FlagsCoordinates.find(
                (mine) =>
                  !(
                    mine.cell === cellPosition.cellIndex && mine.rowIndex === cellPosition.rowIndex
                  ),
              )
            ) {
              // Нашли клетку в которой нет флага и которую надо чекнуть
              if (
                !newCellsThatShouldBeChecked.find(
                  // Проверяем, нет ли там уже той клетки которую мы хотим добавить
                  (cell) =>
                    cell.cell === cellPosition.cellIndex && cell.rowIndex === cellPosition.rowIndex,
                )
              ) {
                newCellsThatShouldBeChecked.push({
                  cell: cellPosition.cellIndex,
                  rowIndex: cellPosition.rowIndex,
                });
              }
            }
          });
          dispatch(
            minesweeperSlice.actions.setCellsThatShouldBeChecked(newCellsThatShouldBeChecked),
          );
        }
      }
      return;
    }
    let mine = false;

    const foundMine = MineCoordinates.find(
      (obj) => obj.cell === cellIndex && obj.rowIndex === rowIndex,
    );
    if (foundMine) {
      setClassName('mine');
      mine = true;
    }

    if (!mine) {
      // Если не мина, то добавляем эту клетку в спсиок открытых клеток
      if (
        !OpenedCells.find(
          // Проверяем, нет ли в массиве с клетками которые нужно проверить клетки которую мы хотим добавить
          (cell: { cell: number; rowIndex: number }) =>
            cell.cell === cellIndex && cell.rowIndex === rowIndex,
        )
      ) {
        dispatch(
          minesweeperSlice.actions.setOpenedCells([
            ...OpenedCells,
            { cell: cellIndex, rowIndex: rowIndex },
          ]),
        );
      }

      let minesAround = 0;

      Object.values(CellPositionsEnum).forEach((value) => {
        const cell = getCell(value, cellIndex, rowIndex);
        // Проверяем не выходим ли мы за границы поля
        if (
          cell.cellIndex < 0 ||
          cell.cellIndex > width - 1 ||
          cell.rowIndex < 0 ||
          cell.rowIndex > height - 1
        ) {
          return;
        }

        if (
          MineCoordinates.find(
            (mine) => mine.cell === cell.cellIndex && mine.rowIndex === cell.rowIndex,
          )
        ) {
          minesAround++;
        }
      });

      setMinesAround(minesAround);

      if (minesAround === 0) {
        setClassName('empty');

        const cellsPositions: { cell: number; rowIndex: number }[] = [];

        Object.values(CellPositionsEnum).forEach((value) => {
          const cellPosition = getCell(value, cellIndex, rowIndex);
          // Проверяем не выходим ли мы за границы поля
          if (
            cellPosition.cellIndex < 0 ||
            cellPosition.cellIndex > width - 1 ||
            cellPosition.rowIndex < 0 ||
            cellPosition.rowIndex > height - 1
          ) {
            return;
          }
          if (
            !CellsThatShouldBeChecked.find(
              // Проверяем, нет ли в массиве с клетками которые нужно проверить клетки которую мы хотим добавить
              (cell) =>
                cell.cell === cellPosition.cellIndex && cell.rowIndex === cellPosition.rowIndex,
            )
          ) {
            cellsPositions.push({
              cell: cellPosition.cellIndex,
              rowIndex: cellPosition.rowIndex,
            });
          }
        });
        setTimeout(() => {
          dispatch(
            minesweeperSlice.actions.setCellsThatShouldBeChecked([
              ...CellsThatShouldBeChecked,
              ...cellsPositions,
            ]),
          );
        }, 0);
      } else {
        setClassName(`minesAround _${minesAround}`);
      }
    }
  }

  function rightClickHandler(event: any) {
    event.preventDefault();
    if (className === 'cell') {
      setIsFlag(true);
      setClassName('flag');
      dispatch(
        minesweeperSlice.actions.setFlagsCoordinates([
          ...FlagsCoordinates,
          { cell: cellIndex, rowIndex: rowIndex },
        ]),
      );
    }
    if (className === 'flag') {
      setIsFlag(false);
      setClassName('cell');

      const newArray: { cell: number; rowIndex: number }[] = FlagsCoordinates.filter(
        (obj) => !(obj.cell === cellIndex && obj.rowIndex === rowIndex),
      );

      console.log('Получили новый массив флагов:', newArray);
      dispatch(minesweeperSlice.actions.setFlagsCoordinates(newArray));
    }
  }
  return (
    <div
      className={`${className}`}
      onClick={clickCell}
      onContextMenu={rightClickHandler}
      draggable={false}
    >
      {minesAround > 0 && minesAround}
      {isFlag && <FlagSvg />}
      {className === 'mine' && <BombSvg />}
    </div>
  );
}

export default Mine;
