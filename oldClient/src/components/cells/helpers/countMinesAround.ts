import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';

export function countMinesAround(cells: cellObject[][], rowIndex: number, cellIndex: number) {
  let minesAround = 0;
  Object.values(CellPositionsEnum).forEach((value) => {
    const cellPosition = getCell(value, cellIndex, rowIndex);
    cells.forEach((row) => {
      row.forEach((cell) => {
        if (
          cell.rowIndex === cellPosition.rowIndex &&
          cell.cellIndex === cellPosition.cellIndex &&
          cell.mine === true
        ) {
          minesAround++;
        }
      });
    });
  });
  return minesAround;
}
