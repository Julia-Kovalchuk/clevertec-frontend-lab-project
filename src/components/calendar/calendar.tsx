/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ArrowDownIcon, ArrowDropDown, ArrowUpIcon } from '../../assets';
import { useCalendar } from '../../hooks/use-calendar';
import { useAppSelector } from '../../store/hooks/hooks';
import { bookBook } from '../../store/selectors';
import { checkDateIsWeekend, checkIsActiveDay, checkIsToday } from '../../utils/date';

import {
  ButtonsBox,
  CurrentMonth,
  Day,
  Days,
  Header,
  Month,
  MonthesWrapper,
  NextDayForBooking,
  StyledButton,
  Today,
  WeekDay,
  WeekDayNames,
  WeekendsDay,
  Wrapper,
} from './styles';

interface IProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
  setDateReserve: (date: Date) => void;
  dateReserve: Date | null;
}

export const Calendar = ({
  locale = 'ru-RU',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber,
  dateReserve,
  setDateReserve,
}: IProps) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });

  const { selectedBookInfo } = useAppSelector(bookBook);

  const [isPushedToday, setIsPushedToday] = useState(false);
  const [isPushedNextDay, setIsPushedNextDay] = useState(false);
  const [isChangeDate, setIsChangeDate] = useState(selectedBookInfo.dateOrder !== null ? true : false);
  // const [isShowMonthes, setIsShowMonthes] = useState(false);

  const handleSelectedDate = (value: Date) => {
    selectDate(value);
    setDateReserve(value);
  };

  // const handleShowMonthes = () => {
  //   setIsShowMonthes(!isShowMonthes);
  // };

  return (
    <Wrapper data-test-id='calendar'>
      <Header>
        <CurrentMonth
          data-test-id='month-select'
          type='button'
          onClick={() => {
            functions.setMode('monthes');
          }}
        >
          <p>{`${state.selectedMonth.monthName} ${state.selectedYear}`}</p> <ArrowDropDown />
        </CurrentMonth>

        <ButtonsBox>
          <StyledButton type='button' onClick={() => functions.onClickArrow('down')} data-test-id='button-prev-month'>
            <ArrowUpIcon fill='inherit' />
          </StyledButton>
          <StyledButton type='button' onClick={() => functions.onClickArrow('up')} data-test-id='button-next-month'>
            <ArrowDownIcon fill='inherit' />
          </StyledButton>
        </ButtonsBox>
      </Header>

      {state.mode === 'monthes' && (
        <MonthesWrapper>
          {state.monthesNames.map((month) => (
            <Month
              type='button'
              onClick={() => {
                functions.setSelectedMonthByIndex(month.monthIndex);
                functions.setMode('days');
              }}
              key={uuidv4()}
            >
              {month.monthShort}
            </Month>
          ))}
        </MonthesWrapper>
      )}

      {state.mode === 'days' && (
        <React.Fragment>
          <WeekDayNames>
            {state.weekDaysNames.map((weekDaysName) => (
              <WeekDay key={weekDaysName.dayShort}>{weekDaysName.dayShort}</WeekDay>
            ))}
          </WeekDayNames>
          <Days>
            {state.calendarDays.map((day) => {
              const isToday = checkIsToday(day.date);
              const isWeekend = checkDateIsWeekend(day.dayNumberInWeek);
              const isNextDayForBooking = checkIsActiveDay(day.dayNumber, day.monthIndex, day.year);
              let isActive = false;

              if (selectedBookInfo.dateOrder)
                new Date(selectedBookInfo.dateOrder).getDate() === day.dayNumber
                  ? (isActive = true)
                  : (isActive = false);

              // TODO : create 1 element for day
              return isWeekend ? (
                <WeekendsDay disabled={true} type='button' key={uuidv4()} $isToday={isToday} data-test-id='day-button'>
                  {day.dayNumber}
                </WeekendsDay>
              ) : isToday ? (
                <Today
                  type='button'
                  onClick={() => {
                    handleSelectedDate(day.date);
                    setIsPushedToday(!isPushedToday);
                    setIsPushedNextDay(false);
                    setIsChangeDate(false);
                  }}
                  key={uuidv4()}
                  $isSelectedValue={isPushedToday || (isChangeDate && isActive)}
                  data-test-id='day-button'
                >
                  {day.dayNumber}
                </Today>
              ) : isNextDayForBooking ? (
                <NextDayForBooking
                  type='button'
                  onClick={() => {
                    handleSelectedDate(day.date);
                    setIsPushedNextDay(!isPushedNextDay);
                    setIsPushedToday(false);
                    setIsChangeDate(false);
                  }}
                  key={uuidv4()}
                  $isSelectedValue={isPushedNextDay || (isChangeDate && isActive)}
                  data-test-id='day-button'
                >
                  {day.dayNumber}
                </NextDayForBooking>
              ) : (
                <Day disabled={true} type='button' key={uuidv4()} data-test-id='day-button'>
                  {day.dayNumber}
                </Day>
              );
            })}
          </Days>
        </React.Fragment>
      )}
    </Wrapper>
  );
};
