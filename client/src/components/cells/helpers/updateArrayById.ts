import { cellObject } from './types';

export function updateArrayById(cellsArray: cellObject[][], id: number) {
  const foundIndex = cellsArray.findIndex((innerArray) => innerArray.some((obj) => obj.id === id));

  if (foundIndex !== -1) {
    const updatedArray = cellsArray.map((innerArray, index) =>
      index === foundIndex
        ? innerArray.map((obj) => (obj.id === id ? { ...obj, opened: true } : obj))
        : innerArray,
    );
    return updatedArray;
  } else {
    // этот элс нужен чтобы тайпскрипт не ругался
    return cellsArray;
  }
}
