import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {newsSlice} from './newsReducer';

export const newsStore = configureStore({
    reducer: {
        news: newsSlice.reducer,
    },
});

export type AppDispatch = typeof newsStore.dispatch;
export type RootState = ReturnType<typeof newsStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;