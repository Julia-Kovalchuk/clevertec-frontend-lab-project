import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ArrowDownIcon, ArrowUpIcon } from '../../assets';
import reviewerAvatarIcon from '../../assets/images/reviewer-avatar.png';
import { clearErrorReview, clearSuccessReview } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { review } from '../../store/selectors';
import { IComment } from '../../types/types';
import { ContainerFlex } from '../../ui/containers';
import { SmallTitle } from '../../ui/typography';
import { PrimaryButton } from '../primary-button/primary-button';
import { Stars } from '../stars/stars';
import { Loader, MessageWindow, ModalRating, Separator } from '..';

import {
  Box,
  ButtonHideReviews,
  Content,
  Info,
  InfoText,
  Review,
  ReviewsAmount,
  Text,
  TitleBox,
  Wrapper,
} from './styles';

interface IProps {
  comments: IComment[];
}

export const ReviewsList = ({ comments }: IProps) => {
  const [isOpenReviewList, setIsOpenReviewList] = useState(true);
  const [isShowReviewModal, setIsShowModal] = useState(false);
  const { isLoadingRating, successMessage, isSuccess, errorRating } = useAppSelector(review);
  const dispatch = useAppDispatch();

  let renderedArray = [] as IComment[];

  if (comments)
    renderedArray = [...comments].sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

  const handleRewievsView = () => {
    setIsOpenReviewList(!isOpenReviewList);
  };

  const showModal = () => {
    setIsShowModal(!isShowReviewModal);
  };

  const closeSuccess = () => {
    dispatch(clearSuccessReview());
  };

  const closeError = () => {
    dispatch(clearErrorReview());
  };

  return (
    <React.Fragment>
      <Wrapper data-test-id='reviews'>
        <TitleBox>
          <ContainerFlex>
            <SmallTitle>
              Отзывы<ReviewsAmount>{comments?.length}</ReviewsAmount>
            </SmallTitle>
            <ButtonHideReviews type='button' onClick={handleRewievsView} data-test-id='button-hide-reviews'>
              {isOpenReviewList ? <ArrowUpIcon fill='#363636' /> : <ArrowDownIcon fill='363636' />}
            </ButtonHideReviews>
          </ContainerFlex>
        </TitleBox>

        {!!renderedArray?.length && isOpenReviewList && (
          <React.Fragment>
            <Separator />
            <Content>
              {renderedArray.map(({ user, text, rating, createdAt }) => (
                <Review key={uuidv4()} data-test-id='comment-wrapper'>
                  <Info>
                    <img src={reviewerAvatarIcon} alt='avatar' />
                    <Box>
                      <InfoText data-test-id='comment-author'>
                        {user.firstName} {user.lastName}
                      </InfoText>
                      <InfoText data-test-id='comment-date'>
                        {new Date(createdAt)
                          .toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                          .slice(0, -3)}
                      </InfoText>
                    </Box>
                  </Info>
                  <Stars rating={rating} />
                  <Text data-test-id='comment-text'>{text}</Text>
                </Review>
              ))}
            </Content>
          </React.Fragment>
        )}

        <PrimaryButton
          large={350}
          padding={14}
          fontSize={16}
          isBig={false}
          dataTestId='button-rate-book'
          onClick={showModal}
        >
          Оценить книгу
        </PrimaryButton>
      </Wrapper>
      {isShowReviewModal && <ModalRating changeModalView={showModal} />}

      {isLoadingRating && <Loader />}
      {isSuccess && (
        <MessageWindow type='success' onClick={closeSuccess}>
          {successMessage}
        </MessageWindow>
      )}
      {errorRating !== null && (
        <MessageWindow type='error' onClick={closeError}>
          {errorRating}
        </MessageWindow>
      )}
    </React.Fragment>
  );
};
