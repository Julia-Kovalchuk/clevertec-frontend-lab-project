import { v4 as uuidv4 } from 'uuid';

import { PaintedStarIcon, StarIcon } from '../../assets';

import { StyledStars, Text } from './styles';

interface IProps {
  rating: number | null;
  gap?: number;
}

export const Stars = ({ rating, gap = 12 }: IProps) =>
  rating === null ? (
    <Text>еще нет оценок</Text>
  ) : (
    <StyledStars gap={gap} data-test-id='rating'>
      {[...Array(+Math.round(rating))].map(() => (
        <PaintedStarIcon key={uuidv4()} data-test-id='star-active' />
      ))}

      {[...Array(5 - +Math.round(rating))].map(() => (
        <StarIcon key={uuidv4()} data-test-id='star' />
      ))}
    </StyledStars>
  );
