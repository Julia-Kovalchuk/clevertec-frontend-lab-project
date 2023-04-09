import styled from 'styled-components';

import { ContainerFlex, ContainerFlexRowCenter } from '../../ui/containers';
import { Media } from '../../ui/media';

type RenderType = { $type: 'error' | 'success' };

const Wrapper = styled(ContainerFlexRowCenter)`
  position: fixed;
  left: 0;
  top: 64px;
  width: 100%;
  z-index: 20;

  ${Media.MD} {
    padding-inline: 50px;
  }

  ${Media.SM} {
    padding-inline: 50px;
  }
`;

const Container = styled(ContainerFlex)<RenderType>`
  justify-content: space-between;

  min-width: 1110px;
  padding: 28px 33px 28px 36px;
  background: ${({ $type }) => ($type === 'error' ? '#FEEBEA' : '#EBF9F1')};
  border: ${({ $type }) => ($type === 'error' ? '1.5px solid #F42C4F' : '1.5px solid #00CA71')};
  border-radius: 5px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: #363636;

  ${Media.MD} {
    top: -63px;
    min-width: 700px;
    width: 100%;
    padding: 27px 19px;
  }

  ${Media.SM} {
    top: -40px;
    min-width: 280px;
    padding: 12px 19px;
    font-size: 14px;
    line-height: 18px;
  }
`;

const MessageContainer = styled(ContainerFlex)`
  grid-gap: 28px;
`;

export { Wrapper, MessageContainer, Container };
