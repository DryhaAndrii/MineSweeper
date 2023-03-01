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
  flag: boolean;
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
  flagsCount: number;
  cells: cellObject[][];
  loading: boolean;
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
  flagsCount: 0,
  loading: false,
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
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    setFlagsCoordinates: (state, action: PayloadAction<cellsArray[]>) => {
      state.FlagsCoordinates = action.payload;
    },
    setWin: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
    },
    setLose: (state, action: PayloadAction<boolean>) => {
      state.lose = action.payload;
    },
    setOpenedCells: (state, action: PayloadAction<number>) => {
      state.openedCells = action.payload;
    },
    setCells: (state, action: PayloadAction<cellObject[][]>) => {
      state.cells = action.payload;
    },
    setFlagsCount: (state, action: PayloadAction<number>) => {
      state.flagsCount = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export default minesweeperSlice.reducer;
