import { ReactNode, useRef } from 'react';

import { useOnClickHide } from '../../hooks/use-on-click-hide';

import { StyledBacking } from './styles';

interface IProps {
  children: ReactNode;
  showModal: (value: boolean) => void;
}

export const Backing = ({ children, showModal }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickHide(ref, () => showModal(false));

  return (
    <StyledBacking data-test-id='modal-outer'>
      <div ref={ref}>{children}</div>
    </StyledBacking>
  );
};
