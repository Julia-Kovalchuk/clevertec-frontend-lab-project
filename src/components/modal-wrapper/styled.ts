import styled from 'styled-components';

import { ContainerFlexColumnCenter } from '../../ui/containers';
import { Media } from '../../ui/media';

const StyledModal = styled(ContainerFlexColumnCenter)`
  position: relative;
  grid-gap: 32px;
  padding: 48px 56px;
  background: #ffffff;
  border-radius: 16px;

  ${Media.SM} {
    width: 100%;
    margin-block: 20px;
    grid-gap: 24px;
    padding: 42px 16px 32px;
  }
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #f9f9fa;

  ${Media.SM} {
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 16px;
  }
`;

export { StyledModal, StyledCloseButton };
