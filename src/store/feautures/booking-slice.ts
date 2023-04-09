/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { bookAPI } from '../../services/book-api';
import {
  IBookingResponse,
  IBookingValues,
  IDeleteBookingResponse,
  IEditBookingData,
  IEditBookingResponse,
} from '../../types/types';

interface IBookingState {
  isBookingLoading: boolean;
  isError: boolean;
  errorBooking: null | string;
  successMessage: string | null;
  isSuccess: boolean;
  bookingID: number | null;
  dateOrder: null | string;
  selectedBookInfo: {
    bookID: string | null;
    booking: boolean;
    bookingID: string | null;
    dateOrder: string | null;
  };
}

const initialState: IBookingState = {
  isBookingLoading: false,
  isError: false,
  errorBooking: null,
  successMessage: null,
  isSuccess: false,
  bookingID: null,
  dateOrder: null,
  selectedBookInfo: {
    bookID: null,
    booking: false,
    bookingID: null,
    dateOrder: null,
  },
};

const fetchBooking = createAsyncThunk<IBookingResponse, IBookingValues, { rejectValue: any }>(
  'booking/fetchBooking',
  async (bookingData, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');

    try {
      return await bookAPI.bookBook(bookingData, token as string);
    } catch (error) {
      const axiosError = error as AxiosError;

      return rejectWithValue(axiosError);
    }
  }
);

const fetchDeleteBooking = createAsyncThunk<IDeleteBookingResponse, number, { rejectValue: any }>(
  'booking/fetchDeleteBooking',
  async (deleteData, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');

    try {
      return await bookAPI.deleteBooking(deleteData, token as string);
    } catch (error) {
      const axiosError = error as AxiosError;

      return rejectWithValue(axiosError);
    }
  }
);

const fetchEditBooking = createAsyncThunk<IEditBookingResponse, IEditBookingData, { rejectValue: any }>(
  'booking/fetchEditBooking',
  async ({ bookingId, fetchData }, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');

    try {
      return await bookAPI.editBooking({ bookingId, fetchData }, token as string);
    } catch (error) {
      const axiosError = error as AxiosError;

      return rejectWithValue(axiosError);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDate(state, { payload }: PayloadAction<string | null>) {
      state.dateOrder = payload;
    },
    setBookingInfo(state, { payload }: PayloadAction<string>) {
      state.selectedBookInfo.booking = true;
      state.selectedBookInfo.bookingID = payload;
    },
    setBookID(state, { payload }: PayloadAction<string>) {
      state.selectedBookInfo.bookID = payload;
    },
    setDateOrder(state, { payload }: PayloadAction<string>) {
      state.selectedBookInfo.dateOrder = payload;
    },
    clearError(state) {
      state.isError = false;
      state.errorBooking = null;
    },
    clearSuccess(state) {
      state.isSuccess = false;
      state.successMessage = null;
    },
    clearBookData(state) {
      state.selectedBookInfo.bookID = null;
      state.selectedBookInfo.booking = false;
      state.selectedBookInfo.bookingID = null;
      state.selectedBookInfo.dateOrder = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBooking.pending, (state) => {
      state.isBookingLoading = true;
      state.isError = false;
      state.errorBooking = null;
      state.isSuccess = false;
      state.successMessage = null;
    });
    builder.addCase(fetchBooking.fulfilled, (state, { payload }) => {
      state.isBookingLoading = false;
      state.isError = false;
      state.errorBooking = null;
      state.isSuccess = true;
      state.bookingID = payload.id;
      state.successMessage = 'Книга забронирована. Подробности можно посмотреть на странице Профиль';
    });
    builder.addCase(fetchBooking.rejected, (state, { payload }) => {
      state.isBookingLoading = false;
      state.isError = !!payload;
      state.errorBooking = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!';
      state.dateOrder = null;
      state.isSuccess = false;
    });

    builder.addCase(fetchDeleteBooking.pending, (state) => {
      state.isBookingLoading = true;
      state.isError = false;
      state.errorBooking = null;
      state.isSuccess = false;
      state.successMessage = null;
    });
    builder.addCase(fetchDeleteBooking.fulfilled, (state, { payload }) => {
      state.isBookingLoading = false;
      state.isError = false;
      state.errorBooking = null;
      state.isSuccess = true;
      state.bookingID = null;
      state.successMessage = 'Бронирование книги успешно отменено!';
    });
    builder.addCase(fetchDeleteBooking.rejected, (state, { payload }) => {
      state.isBookingLoading = false;
      state.isError = true;
      state.errorBooking = 'Не удалось снять бронирование книги. Попробуйте позже!';
      state.dateOrder = null;
      state.isSuccess = false;
      state.successMessage = null;
    });

    builder.addCase(fetchEditBooking.pending, (state) => {
      state.isBookingLoading = true;
      state.isError = false;
      state.errorBooking = null;
      state.isSuccess = false;
      state.successMessage = null;
    });
    builder.addCase(fetchEditBooking.fulfilled, (state, { payload }) => {
      state.isBookingLoading = false;
      state.isError = false;
      state.errorBooking = null;
      state.isSuccess = true;
      state.bookingID = payload.id;
      state.successMessage = 'Изменения успешно сохранены!';
    });
    builder.addCase(fetchEditBooking.rejected, (state, { payload }) => {
      state.isBookingLoading = false;
      state.isError = true;
      state.errorBooking = 'Изменения не были сохранены. Попробуйте позже!';
      state.dateOrder = null;
      state.isSuccess = false;
      state.successMessage = null;
    });
  },
});

export default bookingSlice.reducer;
export { fetchBooking, fetchDeleteBooking, fetchEditBooking };
export const { setBookID, clearError, clearSuccess, setBookingInfo, setDateOrder, clearBookData, setBookingDate } =
  bookingSlice.actions;
