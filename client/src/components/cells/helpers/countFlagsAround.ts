import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';

export function countFlagsAround(cells: cellObject[][], rowIndex: number, cellIndex: number) {
  let flagsAround = 0;
  Object.values(CellPositionsEnum).forEach((value) => {
    const cellPosition = getCell(value, cellIndex, rowIndex);
    cells.forEach((row) => {
      row.forEach((cell) => {
        if (
          cell.rowIndex === cellPosition.rowIndex &&
          cell.cellIndex === cellPosition.cellIndex &&
          cell.flag === true
        ) {
          flagsAround++;
        }
      });
    });
  });
  return flagsAround;
}
