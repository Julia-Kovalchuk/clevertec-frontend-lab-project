/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { bookAPI } from '../../services/book-api';
import { IReviewResponse, IReviewValues } from '../../types/types';

interface IRatingState {
  isLoadingRating: boolean;
  isSuccess: boolean;
  successMessage: null | string;
  errorRating: null | string;
  ratingID: number | null;
}

const initialState: IRatingState = {
  isLoadingRating: false,
  isSuccess: false,
  successMessage: null,
  errorRating: null,
  ratingID: null,
};

const fetchRating = createAsyncThunk<IReviewResponse, IReviewValues, { rejectValue: string }>(
  'review/fetchRating',
  async (reviewData, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');

    try {
      return await bookAPI.review(reviewData, token as string);
    } catch (error) {
      const axiosError = error as AxiosError;

      return rejectWithValue(axiosError.message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearErrorReview(state) {
      state.errorRating = null;
    },
    clearSuccessReview(state) {
      state.isSuccess = false;
      state.successMessage = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRating.pending, (state) => {
      state.isLoadingRating = true;
      state.errorRating = null;
      state.isSuccess = false;
      state.successMessage = null;
      state.ratingID = null;
    });
    builder.addCase(fetchRating.fulfilled, (state, { payload }) => {
      state.isLoadingRating = false;
      state.isSuccess = true;
      state.successMessage = 'Спасибо, что нашли время оценить книгу!';
      state.errorRating = null;
      state.ratingID = payload.id;
    });
    builder.addCase(fetchRating.rejected, (state) => {
      state.isLoadingRating = false;
      state.isSuccess = false;
      state.successMessage = null;
      state.ratingID = null;
      state.errorRating = 'Оценка не была отправлена. Попробуйте позже!';
    });
  },
});

export default reviewSlice.reducer;
export { fetchRating };

export const { clearErrorReview, clearSuccessReview } = reviewSlice.actions;
