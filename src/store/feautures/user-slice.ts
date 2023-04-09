/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { bookAPI } from '../../services/book-api';
import { IBookInfo, IUserBook, IUserInfo } from '../../types/types';

interface IUserState {
  user: IUserInfo;
  isLoading: boolean;
  isError: boolean;
  errorUserMessage: null | string;
}

const initialState: IUserState = {
  user: {} as IUserInfo,
  isLoading: false,
  isError: false,
  errorUserMessage: null,
};

const fetchUser = createAsyncThunk<IUserInfo, undefined, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');

    try {
      return await bookAPI.getUser(token as string);
    } catch (error) {
      const axiosError = error as AxiosError;

      return rejectWithValue(axiosError.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorUserMessage = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.errorUserMessage = null;
      state.user = payload;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.errorUserMessage = 'Что-то пошло не так. Обновите страницу через некоторое время.';
    });
  },
});

export default userSlice.reducer;
export { fetchUser };
