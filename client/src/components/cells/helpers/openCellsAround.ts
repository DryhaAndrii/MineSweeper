import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';

export function openCellsAround(cells: cellObject[][], rowIndex: number, cellIndex: number) {
  const newCells = JSON.parse(JSON.stringify(cells));

  Object.values(CellPositionsEnum).forEach((value) => {
    const cellPosition = getCell(value, cellIndex, rowIndex);
    const cellExists = newCells.some((row: (typeof newCells)[1]) =>
      row.some(
        (cell: (typeof newCells)[1][1]) =>
          cell.rowIndex === cellPosition.rowIndex && cell.cellIndex === cellPosition.cellIndex,
      ),
    );
    if (cellExists) {
      newCells[cellPosition.rowIndex][cellPosition.cellIndex].opened = true;
    }
  });
  return newCells;
}
