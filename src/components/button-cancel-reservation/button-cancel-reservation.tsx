import { ReactNode } from 'react';

import { StyledButtonCancelReservation } from './styles';

interface IProps {
  children: ReactNode;
  large?: number;
  middle?: number;
  small?: number;
  padding?: number;
  fontSize?: number;
  isBig?: boolean;
  onClick?: (e: any) => void;
}

export const ButtonCancelReservation = ({
  children,
  large = 166,
  middle = 166,
  small = 256,
  padding = 11,
  fontSize = 12,
  isBig = false,
  onClick,
}: IProps) => (
  <StyledButtonCancelReservation
    large={large}
    middle={middle}
    small={small}
    padding={padding}
    fontSize={fontSize}
    isBig={isBig}
    onClick={onClick}
    data-test-id='booking-cancel-button'
  >
    {children}
  </StyledButtonCancelReservation>
);
