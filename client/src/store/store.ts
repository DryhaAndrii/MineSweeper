import { configureStore, combineReducers } from '@reduxjs/toolkit';
import minesweeperReducer from './reducers/MinesweeperSlice';

const rootReducer = combineReducers({
  minesweeperReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
