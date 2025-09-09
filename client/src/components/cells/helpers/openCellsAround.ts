import { cellObject } from './types';
import { CellPositionsEnum, getCell } from './getCell';
import { openCellsRecursively } from './openCellsRecursively';

/**
 * Открывает все соседние клетки вокруг указанной позиции
 * Используется когда кликаем по клетке с цифрой и вокруг неё достаточно флагов
 */
export function openCellsAround(cells: cellObject[][], rowIndex: number, cellIndex: number) {
  const newCells = JSON.parse(JSON.stringify(cells));
  const visited = new Set<string>();

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
      const neighborCell = newCells[neighborPos.rowIndex][neighborPos.cellIndex];

      // Открываем только клетки без флагов
      if (!neighborCell.flag && !neighborCell.opened) {
        // Если соседняя клетка пустая, используем рекурсивное открывание
        if (neighborCell.minesAround === 0 && !neighborCell.mine) {
          const result = openCellsRecursively(
            newCells,
            neighborPos.rowIndex,
            neighborPos.cellIndex,
            visited,
          );
          Object.assign(newCells, result);
        } else {
          // Просто открываем клетку с цифрой или миной
          newCells[neighborPos.rowIndex][neighborPos.cellIndex].opened = true;
        }
      }
    }
  });

  return newCells;
}
