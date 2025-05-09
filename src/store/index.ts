import { configureStore } from '@reduxjs/toolkit';

// 目前使用空的reducer，后续可以添加具体功能
const rootReducer = {
  // 这里添加你的reducers
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 