import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './reducers/CounterSlice';
import minesweeperReducer from './reducers/MinesweeperSlice';

const rootReducer = combineReducers({
  counterReducer,
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
