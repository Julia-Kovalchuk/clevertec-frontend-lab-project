import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BookDescription, BookDetails, Breadcrumbs, Loader, MessageWindow } from '../../components';
import { fetchBook } from '../../store/feautures/book-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { bookBook, getBook, review } from '../../store/selectors';

export const BookPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, book, error } = useAppSelector(getBook);
  const { ratingID } = useAppSelector(review);
  const { isSuccess } = useAppSelector(bookBook);

  useEffect(() => {
    if (id) dispatch(fetchBook(id));
  }, [dispatch, id, ratingID, isSuccess]);

  return (
    <React.Fragment>
      <Breadcrumbs booksTitle={book.title} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <MessageWindow type='error'>{error}</MessageWindow>
      ) : (
        <React.Fragment>
          <BookDetails book={book} />
          <BookDescription book={book} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
