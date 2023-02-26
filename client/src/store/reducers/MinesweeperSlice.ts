import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cellsArray {
  rowIndex: number;
  cell: number;
}

interface MinesweeperState {
  width: number;
  height: number;
  countOfMines: number;
  timer: number;
  MineCoordinates: cellsArray[];
  CellsThatShouldBeChecked: cellsArray[];
  FlagsCoordinates: cellsArray[];
  lose: boolean;
  win: boolean;
  OpenedCells: cellsArray[];
}

const initialState: MinesweeperState = {
  height: 9,
  width: 9,
  countOfMines: 9,
  timer: 0,
  MineCoordinates: [],
  CellsThatShouldBeChecked: [],
  FlagsCoordinates: [],
  lose: false,
  win: false,
  OpenedCells: [],
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
    setMinesId: (state, action: PayloadAction<cellsArray[]>) => {
      state.MineCoordinates = action.payload;
    },
    setCellsThatShouldBeChecked: (state, action: PayloadAction<cellsArray[]>) => {
      state.CellsThatShouldBeChecked = action.payload;
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
    setOpenedCells: (state, action: PayloadAction<cellsArray[]>) => {
      state.OpenedCells = action.payload;
    },
  },
});

export default minesweeperSlice.reducer;
