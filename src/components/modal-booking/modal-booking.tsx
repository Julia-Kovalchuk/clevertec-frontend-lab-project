import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useWindowSize } from '../../hooks/use-window-size';
import { clearBookData, fetchBooking, fetchDeleteBooking, fetchEditBooking } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { bookBook, signIn } from '../../store/selectors';
import { Breackpoint } from '../../ui/media';
import { Calendar } from '../calendar/calendar';
import { Backing, ButtonCancelReservation, ModalWrapper, PrimaryButton, Title } from '..';

interface IProps {
  changeModalView: Dispatch<SetStateAction<boolean>>;
  bookId?: number;
}

export const ModalBooking = ({ changeModalView, bookId }: IProps) => {
  const { width = 0 } = useWindowSize();
  const [selectedDate, selectDate] = useState(new Date());
  const [dateReserve, setDateReserve] = useState<Date | null>(null);
  const [isChangeButtonView, setIsChangeButtonView] = useState(false);

  const { selectedBookInfo } = useAppSelector(bookBook);
  const dispatch = useAppDispatch();
  const { userID } = useAppSelector(signIn);
  const checkUser = userID ? String(userID) : localStorage.getItem('userID');

  useEffect(() => {
    setIsChangeButtonView(false);
  }, [dateReserve]);

  const sendBookingData = () => {
    const customer = String(checkUser);

    if (dateReserve) {
      const value = dateReserve.getTimezoneOffset();
      const changedDate = new Date(dateReserve.getTime() - value * 60 * 1000).toISOString();
      const sentData = {
        data: {
          dateOrder: changedDate,
          order: true,
          book: bookId ? String(bookId) : (selectedBookInfo.bookID as string),
          customer,
        },
      };

      dispatch(fetchBooking(sentData)).finally(() => {
        changeModalView(false);
        dispatch(clearBookData());
      });
    }

    if (dateReserve && selectedBookInfo.dateOrder) {
      const value = dateReserve.getTimezoneOffset();
      const changedDate = new Date(dateReserve.getTime() - value * 60 * 1000).toISOString();
      const sentData = {
        data: {
          dateOrder: changedDate,
          order: true,
          book: selectedBookInfo.bookID as string,
          customer: checkUser as string,
        },
      };

      dispatch(
        fetchEditBooking({
          bookingId: Number(selectedBookInfo.bookID),
          fetchData: sentData,
        })
      ).finally(() => {
        changeModalView(false);
        dispatch(clearBookData());
      });
    }
  };

  const cancelReservation = () => {
    if (selectedBookInfo.bookingID)
      dispatch(fetchDeleteBooking(+selectedBookInfo.bookingID)).finally(() => {
        changeModalView(false);
        dispatch(clearBookData());
      });
  };

  return (
    <Backing showModal={changeModalView}>
      <ModalWrapper handleModalView={changeModalView} dataTestId='booking-modal'>
        <Title size={width > Breackpoint.SM ? 24 : 18} color='black' data-test-id='modal-title'>
          {selectedBookInfo.booking ? (
            <p data-test-id='modal-title'>Изменение даты {'\n'}бронирования</p>
          ) : (
            <p data-test-id='modal-title'>Выбор даты {'\n'}бронирования</p>
          )}
        </Title>
        <Calendar
          selectDate={selectDate}
          selectedDate={selectedDate}
          dateReserve={dateReserve}
          setDateReserve={setDateReserve}
        />

        <PrimaryButton
          large={350}
          middle={306}
          padding={14}
          fontSize={16}
          isBig={false}
          disabled={dateReserve === null || isChangeButtonView}
          onClick={sendBookingData}
          dataTestId='booking-button'
        >
          забронировать
        </PrimaryButton>
        {selectedBookInfo.booking && (
          <ButtonCancelReservation
            large={350}
            middle={306}
            padding={14}
            fontSize={16}
            isBig={false}
            onClick={cancelReservation}
          >
            отменить бронь
          </ButtonCancelReservation>
        )}
      </ModalWrapper>
    </Backing>
  );
};
