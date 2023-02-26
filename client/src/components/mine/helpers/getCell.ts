export enum CellPositionsEnum {
  TopLeft = 'topLeft',
  TopMid = 'topMid',
  TopRight = 'topRight',
  Left = 'left',
  Right = 'right',
  BotLeft = 'botLeft',
  BotMid = 'botMid',
  BotRight = 'botRight',
}

export function getCell(type: CellPositionsEnum, cellIndex: number, rowIndex: number) {
  switch (type) {
    case CellPositionsEnum.TopLeft:
      return { cellIndex: cellIndex - 1, rowIndex: rowIndex - 1 };
    case CellPositionsEnum.TopMid:
      return { cellIndex: cellIndex, rowIndex: rowIndex - 1 };
    case CellPositionsEnum.TopRight:
      return { cellIndex: cellIndex + 1, rowIndex: rowIndex - 1 };
    case CellPositionsEnum.Left:
      return { cellIndex: cellIndex - 1, rowIndex: rowIndex };
    case CellPositionsEnum.Right:
      return { cellIndex: cellIndex + 1, rowIndex: rowIndex };
    case CellPositionsEnum.BotLeft:
      return { cellIndex: cellIndex - 1, rowIndex: rowIndex + 1 };
    case CellPositionsEnum.BotMid:
      return { cellIndex: cellIndex, rowIndex: rowIndex + 1 };
    case CellPositionsEnum.BotRight:
      return { cellIndex: cellIndex + 1, rowIndex: rowIndex + 1 };
  }
}
