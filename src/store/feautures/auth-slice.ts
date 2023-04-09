/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { bookAPI } from '../../services/book-api';
import { IAuthResponse, SignInValues } from '../../types/types';

interface IAuthState {
  authStep: string;
  isAuth: boolean;
  isAuthLoading: boolean;
  errorAuthMessage: null | string;
  errorStatus: number | null;
  userID: number | null;
}

const initialState: IAuthState = {
  authStep: 'auth',
  isAuth: false,
  isAuthLoading: false,
  errorAuthMessage: null,
  errorStatus: null,
  userID: null,
};

const fetchAuth = createAsyncThunk<IAuthResponse, SignInValues, { rejectValue: any }>(
  'auth/fetchAuth',
  async (userData, { rejectWithValue }) => {
    try {
      return await bookAPI.signIn(userData);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (!axiosError.response) {
        throw error;
      }

      return rejectWithValue(axiosError);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStep(state, { payload }: PayloadAction<string>) {
      state.authStep = payload;
    },
    clearAuthError(state) {
      state.errorAuthMessage = null;
      state.errorStatus = null;
    },
    unlogin(state) {
      localStorage.clear();
      state.isAuth = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAuth.pending, (state) => {
      state.isAuthLoading = true;
      state.errorStatus = null;
      state.isAuth = false;
      state.userID = null;
      localStorage.clear();
    });
    builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.isAuthLoading = false;
      localStorage.setItem('jwt', payload.jwt);
      state.isAuth = true;
      state.userID = payload.user.id;
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userID', payload.user.id.toString());
    });
    builder.addCase(fetchAuth.rejected, (state, { payload }: any) => {
      state.isAuthLoading = false;
      state.errorAuthMessage = 'Неверный логин или пароль!';
      state.errorStatus = payload.response.status;
      state.isAuth = false;
      state.userID = null;
      if (payload.response.status && payload.response.status !== 400) state.authStep = 'error';
      localStorage.clear();
    });
  },
});

export default authSlice.reducer;
export { fetchAuth };
export const { clearAuthError, setAuthStep, unlogin } = authSlice.actions;
