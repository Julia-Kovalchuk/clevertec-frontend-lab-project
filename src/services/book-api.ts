import axios from 'axios';

import {
  ForgotPasswordValues,
  IAuthResponse,
  IBookInfo,
  IBookingResponse,
  IBookingValues,
  IBookShortInfo,
  ICategory,
  IEditBookingData,
  IEditBookingResponse,
  IEditBookingValues,
  IForgotPasswordResponse,
  IRegisterResponse,
  IResetPasswordResponse,
  IResetPasswordValues,
  IReviewResponse,
  IReviewValues,
  IUserInfo,
  SignInValues,
  SignUpValues,
} from '../types/types';

enum Endpoint {
  CATEGORIES = 'categories',
  ALLBOOKS = 'books',
  DETAILS = 'books/',
  REGISTER = '/auth/local/register',
  AUTH = '/auth/local',
  FORGOT = '/auth/forgot-password',
  RESET = '/auth/reset-password',
  BOOKING = '/bookings',
  DELETE_BOOKING = '/bookings/',
  REVIEW = '/comments',
  EDIT_BOOKING = '/bookings/',
  USER = '/users/me',
}

class BookAPI {
  private readonly BASE_URL = 'https://strapi.cleverland.by/api';

  private readonly API = axios.create({
    baseURL: this.BASE_URL,
  });

  public async getCategories(token: string) {
    const { data } = await this.API.get<ICategory[]>(Endpoint.CATEGORIES, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async getAllBooks(token: string) {
    const { data } = await this.API.get<IBookShortInfo[]>(Endpoint.ALLBOOKS, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async getBookDetails(id: string, token: string) {
    const { data } = await this.API.get<IBookInfo>(`${Endpoint.DETAILS}${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async signUp(userData: SignUpValues) {
    const { data } = await this.API.post<IRegisterResponse>(`${Endpoint.REGISTER}`, userData);

    return data;
  }

  public async signIn(userData: SignInValues) {
    const { data } = await this.API.post<IAuthResponse>(`${Endpoint.AUTH}`, userData);

    return data;
  }

  public async forgotPassword(email: ForgotPasswordValues) {
    const { data } = await this.API.post<IForgotPasswordResponse>(`${Endpoint.FORGOT}`, email);

    return data;
  }

  public async resetPassword(resetData: IResetPasswordValues) {
    const { data } = await this.API.post<IResetPasswordResponse>(`${Endpoint.RESET}`, resetData);

    return data;
  }

  public async bookBook(bookingData: IBookingValues, token: string) {
    const { data } = await this.API.post<IBookingResponse>(`${Endpoint.BOOKING}`, bookingData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async deleteBooking(bookingId: number, token: string) {
    const { data } = await this.API.delete(`${Endpoint.DELETE_BOOKING}${bookingId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async review(reviewData: IReviewValues, token: string) {
    const { data } = await this.API.post<IReviewResponse>(`${Endpoint.REVIEW}`, reviewData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async editBooking({ bookingId, fetchData }: IEditBookingData, token: string) {
    const { data } = await this.API.put<IEditBookingResponse>(`${Endpoint.EDIT_BOOKING}${bookingId}`, fetchData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async getUser(token: string) {
    const { data } = await this.API.get<IUserInfo>(`${Endpoint.USER}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

export const bookAPI = new BookAPI();
