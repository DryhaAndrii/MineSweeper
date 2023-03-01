export interface cellObject {
  id: number;
  rowIndex: number;
  cellIndex: number;
  mine: boolean;
  opened: boolean;
  minesAround: number;
  flag: boolean;
}
