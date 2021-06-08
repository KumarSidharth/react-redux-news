import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../models/news';
import getNews from '../news.api';
import { RootState } from './store';

const initialState: {
    articles: News[],
    filteredArticles: News[],
    filterText: string,
    loading: boolean
} = {
    articles: [],
    filteredArticles: [],
    filterText: '',
    loading: true
};

function filterNews(news: News[], filterText: string): News[] {
    return news.filter(article =>
        article.title.includes(filterText) ||
        article.summary.includes(filterText));
}

export const fetchNewsThunk = createAsyncThunk(
    'news/fetchNews',
    async () => await getNews()
)

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        filterArticles: (state, action: PayloadAction<string>) => {
            state.filteredArticles = filterNews(state.articles, action.payload)
        },
        showLoading: (state) => {
            state.loading = true;
        },
        removeLoading: (state) => {
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsThunk.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.filteredArticles = filterNews(action.payload, state.filterText);
                state.loading = false;
            })
            .addCase(fetchNewsThunk.pending, (state, action) => {
                state.loading = true
            })
    }
})

export const { filterArticles, showLoading, removeLoading} = newsSlice.actions;
export const selectFilteredNews = (state: RootState) => state.news.filteredArticles;
export const selectNewsLoading = (state: RootState) => state.news.loading;
