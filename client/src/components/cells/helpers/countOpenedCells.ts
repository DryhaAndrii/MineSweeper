import { cellObject } from './types';

export function countOpenedCells(cells: cellObject[][]) {
  let openedCells = 0;
  cells.forEach((row) => {
    row.forEach((cell) => {
      if (cell.opened) {
        openedCells++;
      }
    });
  });
  return openedCells;
}
