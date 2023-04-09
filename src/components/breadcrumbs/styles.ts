import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ContainerFlex } from '../../ui/containers';
import { Media } from '../../ui/media';

const StyledBreadcrumbs = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  padding-block: 23px;
  background: #f9f9fa;

  ${Media.MD} {
    padding-block: 20px;
  }

  ${Media.SM} {
  }
`;

const BreadcrumbsContent = styled(ContainerFlex)`
  max-width: 1110px;
  width: 100%;
  margin: 0 auto;
  grid-gap: 5px;

  ${Media.MD} {
    padding-inline: 64px;
  }

  ${Media.SM} {
    padding-inline: 16px;
  }
`;

const StyledLink = styled(Link)`
  color: #a7a7a7;

  ${Media.MD} {
    font-size: 16px;
    line-height: 24px;
  }

  ${Media.SM} {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.2px;
  }
`;

const Text = styled.p`
  color: #a7a7a7;

  ${Media.MD} {
    font-size: 16px;
    line-height: 24px;
  }

  ${Media.SM} {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.2px;
  }
`;

export { StyledBreadcrumbs, BreadcrumbsContent, Text, StyledLink };
