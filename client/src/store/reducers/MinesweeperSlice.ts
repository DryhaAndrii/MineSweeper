import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cellsArray {
  rowIndex: number;
  cellIndex: number;
}
interface cellObject {
  rowIndex: number;
  cellIndex: number;
  mine: boolean;
  id: number;
  opened: boolean;
  minesAround: number;
}

interface MinesweeperState {
  width: number;
  height: number;
  countOfMines: number;
  timer: number;
  FlagsCoordinates: cellsArray[];
  lose: boolean;
  win: boolean;
  openedCells: number;
  cells: cellObject[][];
}

const initialState: MinesweeperState = {
  cells: [],
  height: 9,
  width: 9,
  countOfMines: 9,
  timer: 0,
  FlagsCoordinates: [],
  lose: false,
  win: false,
  openedCells: 0,
};

export const minesweeperSlice = createSlice({
  name: 'minesweeper',
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setCountOfMines: (state, action: PayloadAction<number>) => {
      state.countOfMines = action.payload;
    },
    incTimer: (state) => {
      state.timer = state.timer + 1;
    },
    renewTimer: (state) => {
      state.timer = 0;
    },
    setFlagsCoordinates: (state, action: PayloadAction<cellsArray[]>) => {
      state.FlagsCoordinates = action.payload;
    },
    setWin: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
    },
    setLose: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
    },
    setOpenedCells: (state, action: PayloadAction<number>) => {
      state.openedCells = action.payload;
    },
    setCells: (state, action: PayloadAction<cellObject[][]>) => {
      state.cells = action.payload;
    },
  },
});

export default minesweeperSlice.reducer;
