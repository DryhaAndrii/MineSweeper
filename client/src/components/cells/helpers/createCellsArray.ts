import { cellObject } from './types';

export function createCellsArray(width: number, height: number, countOfMines: number) {
  const cells: cellObject[][] = [];

  // Create array with mine IDs
  const minesCellsIds: number[] = [];
  while (minesCellsIds.length < countOfMines) {
    const random = Math.floor(Math.random() * width * height);
    if (!minesCellsIds.includes(random)) {
      minesCellsIds.push(random);
    }
  }

  let id = 0;

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    cells[rowIndex] = [];
    for (let cellIndex = 0; cellIndex < width; cellIndex++) {
      let mine = false;
      if (minesCellsIds.includes(id)) {
        mine = true;
      }
      cells[rowIndex][cellIndex] = {
        cellIndex,
        rowIndex,
        id,
        mine,
        opened: false,
        minesAround: -1,
        flag: false,
      };
      id++;
    }
  }
  return cells;
}
