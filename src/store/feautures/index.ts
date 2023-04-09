import {
  changeSortType,
  fetchAllBooks,
  renderAllBooks,
  resetSearchBooks,
  searchBooks,
  sortByCategory,
  sortBySortType,
  updateSearchValue,
} from './all-books-slice';
import { clearAuthError, fetchAuth, setAuthStep, unlogin } from './auth-slice';
import { fetchBook } from './book-slice';
import {
  clearBookData,
  clearError,
  clearSuccess,
  fetchBooking,
  fetchDeleteBooking,
  fetchEditBooking,
  setBookID,
  setBookingDate,
  setBookingInfo,
  setDateOrder,
} from './booking-slice';
import { fetchCategories } from './categories-slice';
import { fetchForgotPassword } from './forgot-password-slice';
import {
  clearErrorRegister,
  fetchRegister,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setPhone,
  setRegisterStep,
  setUsername,
} from './register-slice';
import { fetchResetPassword } from './reset-password-slice';
import { clearErrorReview, clearSuccessReview, fetchRating } from './review-slice';
import { fetchUser } from './user-slice';

export {
  changeSortType,
  sortBySortType,
  sortByCategory,
  renderAllBooks,
  updateSearchValue,
  searchBooks,
  resetSearchBooks,
  fetchAllBooks,
  clearAuthError,
  setAuthStep,
  unlogin,
  fetchAuth,
  setBookID,
  clearError,
  clearSuccess,
  setBookingInfo,
  setDateOrder,
  clearBookData,
  setBookingDate,
  fetchBook,
  fetchCategories,
  setRegisterStep,
  setUsername,
  setFirstName,
  setLastName,
  setPassword,
  setPhone,
  setEmail,
  clearErrorRegister,
  fetchForgotPassword,
  fetchResetPassword,
  fetchRegister,
  clearErrorReview,
  clearSuccessReview,
  fetchRating,
  fetchUser,
  fetchBooking,
  fetchDeleteBooking,
  fetchEditBooking,
};
