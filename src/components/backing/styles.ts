import styled from 'styled-components';

import { ContainerFlexColumnCenter } from '../../ui/containers';

const StyledBacking = styled(ContainerFlexColumnCenter)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: rgba(54, 54, 54, 0.3);
  backdrop-filter: blur(10px);
`;

export { StyledBacking };
