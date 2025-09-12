import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';
import { openCellsRecursively } from './openCellsRecursively';

/**
 * Opens all neighboring cells around the specified position
 * Used when clicking on a cell with a number and there are enough flags around it
 */
export function openCellsAround(cells: cellObject[][], rowIndex: number, cellIndex: number) {
  const newCells = JSON.parse(JSON.stringify(cells));
  const visited = new Set<string>();

  // Iterate through all neighboring positions
  Object.values(CellPositionsEnum).forEach((position) => {
    const neighborPos = getCell(position, cellIndex, rowIndex);

    // Check that the neighboring cell is within the field boundaries
    if (
      neighborPos.rowIndex >= 0 &&
      neighborPos.rowIndex < newCells.length &&
      neighborPos.cellIndex >= 0 &&
      neighborPos.cellIndex < newCells[0].length
    ) {
      const neighborCell = newCells[neighborPos.rowIndex][neighborPos.cellIndex];

      // Open only cells without flags
      if (!neighborCell.flag && !neighborCell.opened) {
        // If the neighboring cell is empty, use recursive opening
        if (neighborCell.minesAround === 0 && !neighborCell.mine) {
          const result = openCellsRecursively(
            newCells,
            neighborPos.rowIndex,
            neighborPos.cellIndex,
            visited,
          );
          Object.assign(newCells, result);
        } else {
          // Simply open the cell with a number or mine
          newCells[neighborPos.rowIndex][neighborPos.cellIndex].opened = true;
        }
      }
    }
  });

  return newCells;
}
