import { ReactNode } from 'react';

import { Close, ErrorIcon, SuccessIcon } from '../../assets';

import { Container, MessageContainer, Wrapper } from './styles';

interface IProps {
  type: 'error' | 'success';
  children: ReactNode;
  onClick?: any;
}

export const MessageWindow = ({ type, children, onClick }: IProps) => (
  <Wrapper>
    <Container $type={type} data-test-id='error'>
      <MessageContainer>
        {type === 'error' ? <ErrorIcon /> : <SuccessIcon />}
        {children}
      </MessageContainer>

      <button type='button' onClick={() => onClick(false)} data-test-id='alert-close'>
        <Close fill='#363636' />
      </button>
    </Container>
  </Wrapper>
);
