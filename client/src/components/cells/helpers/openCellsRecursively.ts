import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';

/**
 * Recursively opens cells starting from the specified position
 * If the cell is empty (minesAround === 0), opens all neighboring cells
 * If a neighboring cell is also empty, recursively opens its neighbors
 */
export function openCellsRecursively(
  cells: cellObject[][],
  rowIndex: number,
  cellIndex: number,
  visited: Set<string> = new Set(),
): cellObject[][] {
  // Create a copy of the cells array
  const newCells = JSON.parse(JSON.stringify(cells));

  // Check array boundaries
  if (
    rowIndex < 0 ||
    rowIndex >= newCells.length ||
    cellIndex < 0 ||
    cellIndex >= newCells[0].length
  ) {
    return newCells;
  }

  // Create unique key for tracking visited cells
  const cellKey = `${rowIndex}-${cellIndex}`;

  // If the cell has already been visited, return current state
  if (visited.has(cellKey)) {
    return newCells;
  }

  // Mark the cell as visited
  visited.add(cellKey);

  const currentCell = newCells[rowIndex][cellIndex];

  // If the cell is already opened or flagged, don't open it
  if (currentCell.opened || currentCell.flag) {
    return newCells;
  }

  // Open the current cell
  newCells[rowIndex][cellIndex].opened = true;

  // If the cell is empty (no mines around), open all neighboring cells
  if (currentCell.minesAround === 0 && !currentCell.mine) {
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
        // Recursively open the neighboring cell
        const result = openCellsRecursively(
          newCells,
          neighborPos.rowIndex,
          neighborPos.cellIndex,
          visited,
        );

        // Update cell states
        Object.assign(newCells, result);
      }
    });
  }

  return newCells;
}

/**
 * Opens a cell by ID with recursive opening of neighboring empty cells
 */
export function openCellByIdRecursively(cellsArray: cellObject[][], id: number): cellObject[][] {
  // Find the cell by ID
  let targetRowIndex = -1;
  let targetCellIndex = -1;

  for (let rowIndex = 0; rowIndex < cellsArray.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsArray[rowIndex].length; cellIndex++) {
      if (cellsArray[rowIndex][cellIndex].id === id) {
        targetRowIndex = rowIndex;
        targetCellIndex = cellIndex;
        break;
      }
    }
    if (targetRowIndex !== -1) break;
  }

  // If the cell is not found, return the original array
  if (targetRowIndex === -1 || targetCellIndex === -1) {
    return cellsArray;
  }

  // Open the cell recursively
  return openCellsRecursively(cellsArray, targetRowIndex, targetCellIndex);
}
