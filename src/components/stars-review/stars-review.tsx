/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { StarIcon } from '../../assets';
import { useWindowSize } from '../../hooks/use-window-size';
import { Breackpoint } from '../../ui/media';

import { StyledStarsBox } from './styles';

interface IProps {
  rating: number;
  setRating: (value: number) => void;
}

export const StarsReview = ({ rating, setRating }: IProps) => {
  const [hover, sethover] = useState(0);

  const { width = 0 } = useWindowSize();

  return (
    <StyledStarsBox data-test-id='rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;

        return (
          <button
            type='button'
            data-test-id='star'
            onMouseEnter={() => sethover(index)}
            onMouseLeave={() => sethover(rating)}
            onClick={() => {
              setRating(index);
            }}
          >
            <StarIcon
              data-test-id={index <= rating && 'star-active'}
              width={width < Breackpoint.SM ? '25' : '35'}
              height={width < Breackpoint.SM ? '26' : '33'}
              fill={index <= (rating || hover) ? '#FFBC1F' : 'none'}
              key={uuidv4()}
            />
          </button>
        );
      })}
    </StyledStarsBox>
  );
};
