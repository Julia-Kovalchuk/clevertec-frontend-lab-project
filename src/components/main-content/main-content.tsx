/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-negated-condition */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useViewContext } from '../../context/button-view-context/button-view-context';
import { ROUTE } from '../../routes/routes';
import { clearError, clearSuccess } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { bookBook, getAllBooks } from '../../store/selectors';
import { IBookShortInfo } from '../../types/types';
import { LineBookCard, Loader, MessageWindow, ModalBooking, SquareBookCard } from '..';

import { NoBooksText, StyledLineBooksContent, StyledSquareBooksContent } from './styles';

export const MainContent = () => {
  const { view } = useViewContext();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { isSquare } = view;
  const { isColumn } = view;

  const { renderedBooks, foundBooks, searchValue } = useAppSelector(getAllBooks);
  const { isBookingLoading, isError, successMessage, errorBooking, isSuccess } = useAppSelector(bookBook);

  const [curentBooks, setCurentBooks] = useState<IBookShortInfo[]>(renderedBooks);
  const [isOpenBooking, setIsOpenBooking] = useState(false);

  useEffect(() => {
    searchValue ? setCurentBooks(foundBooks) : setCurentBooks(renderedBooks);
  }, [renderedBooks, foundBooks, searchValue]);

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        dispatch(clearSuccess());
      }
      if (isError) dispatch(clearError());
    }, 6000);
  }, [isError, isSuccess]);

  const handleBookingModalView = () => {
    setIsOpenBooking(!isOpenBooking);
  };

  const closeSuccess = () => {
    dispatch(clearSuccess());
  };

  const closeError = () => {
    dispatch(clearError());
  };

  return curentBooks.length > 0 ? (
    <div data-test-id='content'>
      {(isOpenBooking || isBookingLoading) && <ModalBooking changeModalView={handleBookingModalView} />}

      {isBookingLoading && <Loader />}
      {isSuccess && (
        <MessageWindow type='success' onClick={closeSuccess}>
          {successMessage}
        </MessageWindow>
      )}
      {isError && (
        <MessageWindow type='error' onClick={closeError}>
          {errorBooking}
        </MessageWindow>
      )}

      {isColumn && (
        <StyledLineBooksContent>
          {curentBooks.map((book) => (
            <Link
              to={`${ROUTE.BOOKS}/${
                state && (state?.value.path !== null || state?.value.path !== undefined) ? state.value.path : 'all'
              }/${book.id}`}
              key={book.id}
              state={{
                category: state && state?.value.name !== null ? state.value.name : 'Все книги',
                path:
                  state && (state?.value.path !== null || state?.value.path !== undefined)
                    ? state.value.path
                    : `${ROUTE.BOOKS}${ROUTE.ALLBOOKS}`,
                booksName: book.title,
              }}
            >
              <LineBookCard
                book={book}
                handleBookingModalView={handleBookingModalView}
                bookID={book.id}
                isBooking={book.booking ? true : false}
                bookingID={book.booking ? book.booking.id : null}
                dateOrder={book.booking ? book.booking.dateOrder : null}
              />
            </Link>
          ))}
        </StyledLineBooksContent>
      )}

      {isSquare && (
        <StyledSquareBooksContent>
          {curentBooks.map((book) => (
            <Link
              to={`${ROUTE.BOOKS}/${
                state && (state?.value.path !== null || state?.value.path !== undefined) ? state.value.path : 'all'
              }/${book.id}`}
              key={book.id}
              state={{
                category: state && state?.value.name !== null ? state.value.name : 'Все книги',
                path:
                  state && (state?.value.path !== null || state?.value.path !== undefined)
                    ? state.value.path
                    : `${ROUTE.BOOKS}${ROUTE.ALLBOOKS}`,
                booksName: book.title,
              }}
            >
              <SquareBookCard
                book={book}
                handleBookingModalView={handleBookingModalView}
                bookID={book.id}
                isBooking={book.booking ? true : false}
                bookingID={book.booking ? book.booking.id : null}
                dateOrder={book.booking ? book.booking.dateOrder : null}
              />
            </Link>
          ))}
        </StyledSquareBooksContent>
      )}
    </div>
  ) : searchValue ? (
    <NoBooksText data-test-id='search-result-not-found'>По запросу ничего не найдено</NoBooksText>
  ) : (
    <NoBooksText data-test-id='empty-category'>В этой категории книг ещё нет</NoBooksText>
  );
};
