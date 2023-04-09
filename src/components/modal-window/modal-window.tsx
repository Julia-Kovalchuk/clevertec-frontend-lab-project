import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useWindowSize } from '../../hooks/use-window-size';
import { clearErrorRegister, setAuthStep, setRegisterStep } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { signIn, signUp } from '../../store/selectors';
import { Breackpoint } from '../../ui/media';
import { PrimaryButton } from '../primary-button/primary-button';
import { Title } from '../title/title';

import { Text, Wrapper } from './styles';

interface IProps {
  title: string;
  buttonTitle: string;
  children: ReactNode;
  to: string;
  showButton?: boolean;
}

export const ModalWindow = ({ title, buttonTitle, children, to, showButton }: IProps) => {
  const { width = 0 } = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { registerStep } = useAppSelector(signUp);
  const { authStep } = useAppSelector(signIn);

  const handleClick = () => {
    if (registerStep === 'error') dispatch(setRegisterStep('1'));
    if (authStep === 'error') dispatch(setAuthStep('auth'));

    dispatch(clearErrorRegister());
    navigate(to);
  };

  return (
    <Wrapper data-test-id='status-block'>
      <Title size={width > Breackpoint.SM ? 24 : 18} color='black' margin={0} weight={700}>
        {title}
      </Title>

      <Text>{children}</Text>

      {showButton && (
        <PrimaryButton
          large={350}
          middle={306}
          padding={14}
          fontSize={16}
          isBig={true}
          type='button'
          onClick={handleClick}
        >
          {buttonTitle}
        </PrimaryButton>
      )}
    </Wrapper>
  );
};
