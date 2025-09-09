import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';

/**
 * Рекурсивно открывает клетки начиная с указанной позиции
 * Если клетка пустая (minesAround === 0), то открывает все соседние клетки
 * Если соседняя клетка тоже пустая, то рекурсивно открывает её соседей
 */
export function openCellsRecursively(
  cells: cellObject[][],
  rowIndex: number,
  cellIndex: number,
  visited: Set<string> = new Set(),
): cellObject[][] {
  // Создаем копию массива клеток
  const newCells = JSON.parse(JSON.stringify(cells));

  // Проверяем границы массива
  if (
    rowIndex < 0 ||
    rowIndex >= newCells.length ||
    cellIndex < 0 ||
    cellIndex >= newCells[0].length
  ) {
    return newCells;
  }

  // Создаем уникальный ключ для отслеживания посещенных клеток
  const cellKey = `${rowIndex}-${cellIndex}`;

  // Если клетка уже была посещена, возвращаем текущее состояние
  if (visited.has(cellKey)) {
    return newCells;
  }

  // Помечаем клетку как посещенную
  visited.add(cellKey);

  const currentCell = newCells[rowIndex][cellIndex];

  // Если клетка уже открыта или помечена флагом, не открываем её
  if (currentCell.opened || currentCell.flag) {
    return newCells;
  }

  // Открываем текущую клетку
  newCells[rowIndex][cellIndex].opened = true;

  // Если клетка пустая (нет мин вокруг), открываем все соседние клетки
  if (currentCell.minesAround === 0 && !currentCell.mine) {
    // Проходим по всем соседним позициям
    Object.values(CellPositionsEnum).forEach((position) => {
      const neighborPos = getCell(position, cellIndex, rowIndex);

      // Проверяем, что соседняя клетка находится в пределах поля
      if (
        neighborPos.rowIndex >= 0 &&
        neighborPos.rowIndex < newCells.length &&
        neighborPos.cellIndex >= 0 &&
        neighborPos.cellIndex < newCells[0].length
      ) {
        // Рекурсивно открываем соседнюю клетку
        const result = openCellsRecursively(
          newCells,
          neighborPos.rowIndex,
          neighborPos.cellIndex,
          visited,
        );

        // Обновляем состояние клеток
        Object.assign(newCells, result);
      }
    });
  }

  return newCells;
}

/**
 * Открывает клетку по ID с рекурсивным открыванием соседних пустых клеток
 */
export function openCellByIdRecursively(cellsArray: cellObject[][], id: number): cellObject[][] {
  // Находим клетку по ID
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

  // Если клетка не найдена, возвращаем исходный массив
  if (targetRowIndex === -1 || targetCellIndex === -1) {
    return cellsArray;
  }

  // Открываем клетку рекурсивно
  return openCellsRecursively(cellsArray, targetRowIndex, targetCellIndex);
}
