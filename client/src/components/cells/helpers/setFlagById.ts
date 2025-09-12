import { cellObject } from './types';

export function setFlagById(cellsArray: cellObject[][], id: number) {
  const foundIndex = cellsArray.findIndex(function (innerArray) {
    return innerArray.some(function (obj) {
      return obj.id === id;
    });
  });

  if (foundIndex !== -1) {
    const updatedArray = cellsArray.map(function (innerArray, index) {
      if (index === foundIndex) {
        return innerArray.map(function (obj) {
          if (obj.id === id) {
            if (obj.flag) {
              return Object.assign({}, obj, { flag: false });
            } else {
              return Object.assign({}, obj, { flag: true });
            }
          } else {
            return obj;
          }
        });
      } else {
        return innerArray;
      }
    });
    return updatedArray;
  } else {
    // This else is needed so TypeScript doesn't complain
    return cellsArray;
  }
}
