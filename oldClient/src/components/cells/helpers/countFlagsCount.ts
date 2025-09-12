import { cellObject } from './types';

export function countFlagsCount(cells: cellObject[][]) {
  let flagsCount = 0;
  cells.forEach((row) => {
    row.forEach((cell) => {
      if (cell.flag) {
        flagsCount++;
      }
    });
  });
  return flagsCount;
}
