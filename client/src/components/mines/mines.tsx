import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { minesweeperSlice } from '../../store/reducers/MinesweeperSlice';
import Mine from '../mine/mine';
import './mines.scss';

interface MyObject {
  id: number;
  rowIndex: number;
  cellIndex: number;
}

function Mines() {
  const [mines, setMines] = useState<MyObject[][]>([]);
  const dispatch = useAppDispatch();
  const { countOfMines, height, width } = useAppSelector((state) => state.minesweeperReducer);
  useEffect(() => {
    // Обнуляем массив с координатами клеток которые надо проверить
    const cellsPositions: { cell: number; rowIndex: number }[] = [];
    dispatch(minesweeperSlice.actions.setCellsThatShouldBeChecked([...cellsPositions]));
    // Обнуляем массив с флагами
    dispatch(minesweeperSlice.actions.setFlagsCoordinates([...cellsPositions]));
    // Обнуляем открытые клетки
    dispatch(minesweeperSlice.actions.setOpenedCells([...cellsPositions]));
    // Обнуляем массив с клетками
    createMinesArray(0, 0, 0);

    setTimeout(() => {
      createMinesArray(height, width, countOfMines);
    }, 1);
  }, [countOfMines, height, width]);
  function createMinesArray(height: number, width: number, countOfMines: number) {
    const newArray: MyObject[][] = [];
    setMines(newArray);
    for (let row = 0, id = 1; row < height; row++) {
      newArray[row] = [];
      for (let cell = 0; cell < width; cell++) {
        newArray[row][cell] = { id, rowIndex: row, cellIndex: cell };
        id++;
      }
    }
    const mines = [];
    while (mines.length < countOfMines) {
      const random = Math.round(Math.random() * height * width);
      const check = mines.includes(random);
      if (check === false) {
        mines.push(random);
      }
    }
    const MineCoordinatesToDispatch = [];
    for (let i = 0; i < mines.length; i++) {
      for (let row = 0; row < height; row++) {
        for (let cell = 0; cell < width; cell++) {
          if (mines[i] === newArray[row][cell].id) {
            MineCoordinatesToDispatch.push({
              rowIndex: newArray[row][cell].rowIndex,
              cell: newArray[row][cell].cellIndex,
            });
          }
        }
      }
    }

    dispatch(minesweeperSlice.actions.setMinesId(MineCoordinatesToDispatch));
    setMines(newArray);
  }

  return (
    <div className='minesWrapper'>
      {mines.map((row, rowIndex) => (
        <div className={`row ${rowIndex}`} key={rowIndex}>
          {row.map((cell) => (
            <Mine key={cell.id} id={cell.id} cellIndex={cell.cellIndex} rowIndex={cell.rowIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Mines;
