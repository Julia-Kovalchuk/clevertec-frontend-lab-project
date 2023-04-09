import { ReactNode } from 'react';

import { Close } from '../../assets';

import { StyledCloseButton, StyledModal } from './styled';

interface IProps {
  children: ReactNode;
  handleModalView: any;
  dataTestId?: string;
}

export const ModalWrapper = ({ children, dataTestId, handleModalView }: IProps) => (
  <StyledModal data-test-id={dataTestId}>
    <StyledCloseButton onClick={handleModalView} data-test-id='modal-close-button'>
      <Close fill='#F83600' />
    </StyledCloseButton>
    {children}
  </StyledModal>
);
