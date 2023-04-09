import { Dispatch, SetStateAction, useState } from 'react';

import { useWindowSize } from '../../hooks/use-window-size';
import { fetchRating } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getBook, signIn } from '../../store/selectors';
import { IReviewValues } from '../../types/types';
import { Breackpoint } from '../../ui/media';
import { Backing, ModalWrapper, PrimaryButton, StarsReview, Title } from '..';

import { ReviewArea } from './styles';

interface IProps {
  changeModalView: Dispatch<SetStateAction<boolean>>;
}

export const ModalRating = ({ changeModalView }: IProps) => {
  const { width = 0 } = useWindowSize();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();

  const { book } = useAppSelector(getBook);
  const { userID } = useAppSelector(signIn);
  const checkUser = userID ? String(userID) : localStorage.getItem('userID');

  const handleReview = () => {
    const sentData: IReviewValues = {
      data: {
        rating,
        text: review,
        book: String(book.id),
        user: checkUser as string,
      },
    };

    dispatch(fetchRating(sentData)).finally(() => {
      changeModalView(false);
    });
  };

  return (
    <Backing showModal={changeModalView}>
      <ModalWrapper handleModalView={changeModalView} dataTestId='modal-rate-book'>
        <Title size={width > Breackpoint.SM ? 24 : 18} color='black'>
          <p data-test-id='modal-title'>Оцените книгу</p>
        </Title>

        <Title size={16} color='black'>
          Ваша оценка
        </Title>
        <StarsReview rating={rating} setRating={setRating} />

        <ReviewArea
          placeholder='Оставить отзыв'
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          data-test-id='comment'
        />

        <PrimaryButton
          large={350}
          middle={306}
          padding={14}
          fontSize={16}
          isBig={true}
          onClick={handleReview}
          dataTestId='button-comment'
        >
          оценить
        </PrimaryButton>
      </ModalWrapper>
    </Backing>
  );
};
