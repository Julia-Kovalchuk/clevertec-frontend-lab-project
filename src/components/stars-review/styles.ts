import styled from 'styled-components';

import { ContainerFlex } from '../../ui/containers';
import { Media } from '../../ui/media';

const StyledStarsBox = styled(ContainerFlex)`
  grid-gap: 19px;

  ${Media.SM} {
    grid-gap: 17px;
  }
`;

export { StyledStarsBox };
