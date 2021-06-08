import { configureStore } from '@reduxjs/toolkit';
import {newsSlice} from './newsReducer';

export const newsStore = configureStore({
    reducer: {
        news: newsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof newsStore.getState>;
