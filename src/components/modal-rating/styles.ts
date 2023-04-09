import styled from 'styled-components';

import { Media } from '../../ui/media';

const ReviewArea = styled.textarea`
  width: 416px;
  min-height: 132px;
  max-height: 132px;
  background: #f9f9fa;
  border-radius: 4px;
  padding: 19px 12px;
  margin-bottom: 52px;
  margin-top: 37px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: #363636;
  font-family: inherit;
  resize: none;
  border: none;

  &::placeholder {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.1px;
    color: #a7a7a7;
    font-family: inherit;
  }

  &:focus {
    outline: 1px solid #f9d423;
  }

  ${Media.SM} {
    width: 280px;
    min-width: 280px;
    margin-bottom: 44px;
  }
`;

export { ReviewArea };
