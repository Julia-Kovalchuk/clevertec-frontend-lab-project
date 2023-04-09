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
  StyledLineBookCard,
  Text,
  Title,
  WrapperContent,
  WrapperImage,
  WrapperRow,
  WrapperText,
} from './styles';

interface IProps {
  book: IBookShortInfo;
  handleBookingModalView: () => void;
  bookID: number;
  isBooking: boolean;
  bookingID: number | null;
  dateOrder: string | null;
}

export const LineBookCard = ({ book, handleBookingModalView, bookID, isBooking, bookingID, dateOrder }: IProps) => {
  const { image, issueYear, authors, title, rating, booking, delivery } = book;
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector(getAllBooks);
  const { userID } = useAppSelector(signIn);

  const checkUser = userID ? userID : Number(localStorage.getItem('userID'));

  const highlightText = useCallback((str: string) => <Hightlight filter={searchValue} str={str} />, [searchValue]);

  return (
    <StyledLineBookCard data-test-id='card'>
      <WrapperImage>
        {image ? (
          <Image src={`https://strapi.cleverland.by${image.url}`} alt={title} />
        ) : (
          <NoImage>
            <NoImageIcon />
          </NoImage>
        )}
      </WrapperImage>

      <WrapperContent>
        <Title>{highlightText(title)}</Title>

        <WrapperText>
          <Text>{authors?.join(', ')}, </Text>
          <Text>{issueYear}</Text>
        </WrapperText>

        <WrapperRow>
          <Stars rating={rating} />

          {booking?.order === true && (
            <ButtonOccupied
              disabled={booking.customerId === checkUser ? false : true}
              large={174}
              middle={174}
              small={186}
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
              large={174}
              middle={174}
              small={186}
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
        </WrapperRow>
      </WrapperContent>
    </StyledLineBookCard>
  );
};
