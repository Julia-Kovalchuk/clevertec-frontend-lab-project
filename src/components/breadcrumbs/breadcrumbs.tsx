import { useLocation } from 'react-router-dom';

import { ROUTE } from '../../routes/routes';

import { BreadcrumbsContent, StyledBreadcrumbs, StyledLink, Text } from './styles';

interface IProps {
  booksTitle: string;
}

export const Breadcrumbs = ({ booksTitle }: IProps) => {
  const { state } = useLocation();

  return (
    <StyledBreadcrumbs>
      <BreadcrumbsContent>
        <StyledLink
          to={
            state?.path && state?.path !== '/books/all'
              ? `${ROUTE.BOOKS}/${state?.path}`
              : `${ROUTE.BOOKS}${ROUTE.ALLBOOKS}`
          }
          data-test-id='breadcrumbs-link'
        >
          {state?.category ? state.category : 'Все книги'}
        </StyledLink>
        <Text> / </Text>
        <Text data-test-id='book-name'>{booksTitle}</Text>
      </BreadcrumbsContent>
    </StyledBreadcrumbs>
  );
};
