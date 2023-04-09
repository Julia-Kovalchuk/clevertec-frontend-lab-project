import styled, { css } from 'styled-components';

import { ContainerFlex, ContainerFlexBeetween, ContainerFlexColumnCenter } from '../../ui/containers';

type $isSelectedValue = { $isSelectedValue: boolean };
type $isToday = { $isToday: boolean };

const Wrapper = styled(ContainerFlexColumnCenter)`
  min-width: 256px;
  max-width: 256px;
  background: #ffffff;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
    0px 1px 5px rgba(191, 196, 201, 0.24);
  border-radius: 8px;
`;

const WeekDayNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  width: 100%;
`;

const WeekDay = styled(ContainerFlexColumnCenter)`
  width: 32px;
  height: 32px;
  background: linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
`;

const DayStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
`;

const Day = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: #a7a7a7;
`;

const Today = styled.button<$isSelectedValue>`
  ${DayStyles}
  border-radius: 16px;
  background: ${({ $isSelectedValue }) =>
    $isSelectedValue ? 'linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%)' : 'rgba(0, 0, 0, 0)'};
  color: ${({ $isSelectedValue }) => ($isSelectedValue ? 'rgb(255, 255, 255)' : '#f83600')};

  &:hover {
    border: 1px solid #bfc4c9;
    border-radius: 16px;
  }

  &:active {
    background: linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%);
  }
`;

const NextDayForBooking = styled.button<$isSelectedValue>`
  ${DayStyles}
  color: ${({ $isSelectedValue }) => ($isSelectedValue ? 'rgb(255, 255, 255)' : '#363636')};
  border-radius: 16px;
  background: ${({ $isSelectedValue }) =>
    $isSelectedValue ? 'linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%)' : 'rgba(0, 0, 0, 0)'};

  &:hover {
    border: 1px solid #bfc4c9;
  }

  &:active {
    background: linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%);
  }
`;

const WeekendsDay = styled.button<$isToday>`
  ${DayStyles}
  background: #feebea;
  border-radius: 16px;
  color: ${({ $isToday }) => ($isToday ? '#F83600' : '#A7A7A7')};
`;

const Header = styled(ContainerFlexBeetween)`
  width: 100%;
  padding-inline: 8px;
`;

const CurrentMonth = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 10px;
  min-width: 100px;
  padding: 2px 5px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: #a7a7a7;

  &:hover {
    box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
      0px 1px 5px rgba(191, 196, 201, 0.24);
    border-radius: 10px;
  }
`;

const ButtonsBox = styled(ContainerFlex)`
  grid-gap: 18px;
`;

const StyledButton = styled.button`
  fill: #363636;

  &:hover {
    fill: #f83600;
  }

  &:active {
    fill: #f9d423;
  }
`;

const MonthesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  min-width: 256px;
  max-width: 256px;
  min-height: 192px;
`;

const Month = styled.button`
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.2px;
  background: linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    scale: 1.2;
  }
`;

export {
  Wrapper,
  WeekDayNames,
  WeekDay,
  Days,
  Day,
  WeekendsDay,
  Today,
  NextDayForBooking,
  CurrentMonth,
  Header,
  ButtonsBox,
  StyledButton,
  MonthesWrapper,
  Month,
};
