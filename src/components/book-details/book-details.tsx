/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';

import { NoImageIcon } from '../../assets';
import { useWindowSize } from '../../hooks/use-window-size';
import { clearError, clearSuccess, setBookID, setBookingInfo, setDateOrder } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { bookBook, signIn } from '../../store/selectors';
import { IBookInfo } from '../../types/types';
import { Breackpoint } from '../../ui/media';
import { SliderMini } from '../slider-mini/slider-mini';
import { ButtonOccupied, ButtonOccupiedUntil, Loader, MessageWindow, ModalBooking, PrimaryButton, Slider } from '..';

import {
  Author,
  BookTitle,
  Description,
  Image,
  NoImage,
  StyledBookDetails,
  TitleDescription,
  WrapperContent,
  WrapperDekstopDescription,
  WrapperImage,
  WrapperTabletDescription,
  WrapperText,
} from './styles';

interface IProps {
  book: IBookInfo;
}

export const BookDetails = ({ book }: IProps) => {
  const { images, title, authors, issueYear, booking, description, delivery, id } = book;
  const [isOpenBooking, setIsOpenBooking] = useState(false);
  const [dateReserve, setDateReserve] = useState<Date | null>(null);
  const [isChangeButtonView, setIsChangeButtonView] = useState(false);

  const { width = 0 } = useWindowSize();
  const { isBookingLoading, isError, successMessage, errorBooking, isSuccess } = useAppSelector(bookBook);
  const { userID } = useAppSelector(signIn);
  const dispatch = useAppDispatch();
  const checkUser = userID ? String(userID) : localStorage.getItem('userID');

  useEffect(() => {
    setIsChangeButtonView(false);
  }, [dateReserve]);

  useEffect(() => {
    setTimeout(() => {
      if (successMessage !== null) {
        dispatch(clearSuccess());
      }
      if (isError) dispatch(clearError());
    }, 4000);
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

  return (
    <React.Fragment>
      {(isOpenBooking || isBookingLoading) && <ModalBooking changeModalView={handleBookingModalView} bookId={id} />}

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

      <StyledBookDetails>
        <WrapperImage>
          {images ? (
            images.length === 1 ? (
              <Image src={`https://strapi.cleverland.by${images[0].url}`} alt={title} />
            ) : width > Breackpoint.MD ? (
              <Slider images={images} />
            ) : (
              <SliderMini images={images} />
            )
          ) : (
            <NoImage>
              <NoImageIcon />
            </NoImage>
          )}
        </WrapperImage>

        <WrapperContent>
          <BookTitle data-test-id='book-title'>{title}</BookTitle>

          <Author>
            {authors && <WrapperText>{authors?.join(', ')}, </WrapperText>}
            <WrapperText>{issueYear}</WrapperText>
          </Author>

          {booking?.order === true && checkUser !== null && (
            <ButtonOccupied
              large={350}
              middle={306}
              padding={14}
              fontSize={16}
              isBig={false}
              disabled={String(booking.customerId) === checkUser ? false : true}
              onClick={(e) => {
                e.preventDefault();
                handleBookingModalView();
                dispatch(setBookID(String(id)));
                if (booking.order) {
                  dispatch(setBookingInfo(String(booking.id)));
                  dispatch(setDateOrder(booking.dateOrder as string));
                }
              }}
            >
              забронирована
            </ButtonOccupied>
          )}
          {delivery?.dateHandedTo && (
            <ButtonOccupiedUntil
              large={350}
              middle={306}
              padding={14}
              fontSize={16}
              disabled={true}
              data-test-id='booking-button'
              onClick={(e) => {
                e.preventDefault();
              }}
            >{`Занята до ${new Date(delivery.dateHandedTo).getDate()}.${(new Date(delivery.dateHandedTo).getMonth() + 1)
              .toString()
              .padStart(2, '0')}`}</ButtonOccupiedUntil>
          )}
          {booking === null && delivery === null && (
            <PrimaryButton
              large={350}
              middle={306}
              padding={14}
              fontSize={16}
              isBig={false}
              onClick={handleBookingModalView}
              dataTestId='booking-button'
            >
              Забронировать
            </PrimaryButton>
          )}

          {width > Breackpoint.MD && (
            <WrapperDekstopDescription>
              <TitleDescription>О книге</TitleDescription>
              {description ? (
                <Description>{description}</Description>
              ) : (
                <Description>Данная информация отсутствует</Description>
              )}
            </WrapperDekstopDescription>
          )}
        </WrapperContent>
      </StyledBookDetails>

      {width < Breackpoint.MD && (
        <WrapperTabletDescription>
          <TitleDescription>О книге</TitleDescription>
          {description ? (
            <Description>{description}</Description>
          ) : (
            <Description>Данная информация отсутствует</Description>
          )}
        </WrapperTabletDescription>
      )}
    </React.Fragment>
  );
};
