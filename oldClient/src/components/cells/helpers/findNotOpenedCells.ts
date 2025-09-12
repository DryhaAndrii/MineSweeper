import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';

export function findNotOpenedCells(cells: cellObject[][]) {
  const cellsToReturn: (typeof cells)[number] = [];
  cells.forEach((row) => {
    row.forEach((cell) => {
      if (cell.opened && cell.minesAround === 0 && cell.mine === false) {
        Object.values(CellPositionsEnum).forEach((value) => {
          const cellPosition = getCell(value, cell.cellIndex, cell.rowIndex);
          if (
            cellPosition.rowIndex > cells.length - 1 ||
            cellPosition.rowIndex < 0 ||
            cellPosition.cellIndex > cells[0].length - 1 ||
            cellPosition.cellIndex < 0
          ) {
          } else {
            if (
              cells[cellPosition.rowIndex][cellPosition.cellIndex].opened === false &&
              cells[cellPosition.rowIndex][cellPosition.cellIndex].mine === false
            ) {
              if (!cellsToReturn.includes(cell)) {
                cellsToReturn.push(cell);
              }
            }
          }
        });
      }
    });
  });
  return cellsToReturn;
}
