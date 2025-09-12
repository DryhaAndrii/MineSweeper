import { cellObject } from './types';

export function openMines(cellsArray: cellObject[][]) {
  const updatedArray = cellsArray.map(function (innerArray) {
    return innerArray.map(function (obj) {
      if (obj.mine) {
        return Object.assign({}, obj, { opened: true });
      } else {
        return obj;
      }
    });
  });
  return updatedArray;
}
