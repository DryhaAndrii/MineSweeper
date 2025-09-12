import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  lose: boolean;
  win: boolean;
  openedCells: number;
  flagsCount: number;
  cells: cellObject[][];
  loading: boolean;
  showRecords: boolean;
  uiVersion: 'old' | 'new';
}

// Get UI version from localStorage or use 'new' as default
const getInitialUIVersion = (): 'old' | 'new' => {
  const saved = localStorage.getItem('minesweeper-ui-version');
  return saved === 'old' || saved === 'new' ? saved : 'new';
};

const initialState: MinesweeperState = {
  cells: [],
  height: 9,
  width: 9,
  countOfMines: 9,
  timer: 0,
  lose: false,
  win: false,
  openedCells: 0,
  flagsCount: 0,
  loading: false,
  showRecords: false,
  uiVersion: getInitialUIVersion(),
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
    setShowRecords: (state, action: PayloadAction<boolean>) => {
      state.showRecords = action.payload;
    },
    setUIVersion: (state, action: PayloadAction<'old' | 'new'>) => {
      state.uiVersion = action.payload;
      localStorage.setItem('minesweeper-ui-version', action.payload);
    },
  },
});

export default minesweeperSlice.reducer;
