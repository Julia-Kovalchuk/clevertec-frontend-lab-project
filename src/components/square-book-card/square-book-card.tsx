/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useCallback } from 'react';

import { NoImageIcon } from '../../assets';
import { setBookID, setBookingInfo, setDateOrder } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getAllBooks, signIn } from '../../store/selectors';
import { IBookShortInfo } from '../../types/types';
import { ButtonOccupied, ButtonOccupiedUntil, Hightlight, PrimaryButton, Stars } from '..';

import {
  Image,
  NoImage,
  StyledSquareBookCard,
  SubTitle,
  Text,
  Title,
  WrapperImage,
  WrapperText,
  WrapperTitle,
} from './styles';

interface IProps {
  book: IBookShortInfo;
  handleBookingModalView: () => void;
  bookID: number;
  isBooking: boolean;
  bookingID: number | null;
  dateOrder: string | null;
}

export const SquareBookCard = ({ book, handleBookingModalView, bookID, isBooking, bookingID, dateOrder }: IProps) => {
  const { image, issueYear, authors, title, rating, booking, delivery } = book;
  const { searchValue } = useAppSelector(getAllBooks);
  const dispatch = useAppDispatch();
  const { userID } = useAppSelector(signIn);
  const checkUser = userID ? userID : Number(localStorage.getItem('userID'));

  const highlightText = useCallback((str: string) => <Hightlight filter={searchValue} str={str} />, [searchValue]);

  return (
    <StyledSquareBookCard data-test-id='card'>
      <WrapperImage>
        {image ? (
          <Image src={`https://strapi.cleverland.by${image.url}`} alt={title} />
        ) : (
          <NoImage>
            <NoImageIcon />
          </NoImage>
        )}
      </WrapperImage>

      <Stars rating={rating} gap={6} />

      <WrapperTitle>
        <Title>{highlightText(title)}</Title>
      </WrapperTitle>

      <SubTitle>
        <WrapperText>
          <Text>{authors?.join(', ')}, </Text>
          <Text>{issueYear}</Text>
        </WrapperText>
      </SubTitle>
      {booking?.order === true && (
        <ButtonOccupied
          disabled={booking.customerId === checkUser ? false : true}
          onClick={(e) => {
            e.preventDefault();
            handleBookingModalView();
            dispatch(setBookID(String(bookID)));
            if (isBooking && bookingID && dateOrder) {
              dispatch(setBookingInfo(String(bookingID)));
              dispatch(setDateOrder(dateOrder));
            }
          }}
        >
          забронирована
        </ButtonOccupied>
      )}
      {delivery !== null && (
        <ButtonOccupiedUntil
          disabled={true}
          onClick={(e) => {
            e.preventDefault();
          }}
        >{`Занята до ${new Date(delivery.dateHandedTo).getDate()}.${(new Date(delivery.dateHandedTo).getMonth() + 1)
          .toString()
          .padStart(2, '0')}`}</ButtonOccupiedUntil>
      )}
      {booking === null && delivery === null && (
        <PrimaryButton
          onClick={(e) => {
            e.preventDefault();
            handleBookingModalView();
            dispatch(setBookID(String(bookID)));
          }}
          dataTestId='booking-button'
        >
          Забронировать
        </PrimaryButton>
      )}
    </StyledSquareBookCard>
  );
};
