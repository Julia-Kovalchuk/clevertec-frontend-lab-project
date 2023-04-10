import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ArrowDownIcon, ArrowUpIcon } from '../../assets';
import { ROUTE } from '../../routes/routes';
import { fetchAllBooks, sortByCategory } from '../../store/feautures';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { bookBook, getAllBooks, getCategories } from '../../store/selectors';
import { CustomAsidelink } from '../custom-aside-link/custom-aside-link';

import { Amount, ButtonHide, CategoryBox, ContainerLink, Wrapper } from './styles';

interface IProps {
  isOpen: boolean;
  handleCategoryView: () => void;
  handleView: () => void;
}

export const AsideBar = ({ isOpen, handleCategoryView, handleView }: IProps) => {
  const currentPath = useParams();
  const dispatch = useAppDispatch();
  const { errorCategories, categories } = useAppSelector(getCategories);
  const { categoriesAmount, error } = useAppSelector(getAllBooks);
  const { bookingID } = useAppSelector(bookBook);

  useEffect(() => {
    const categoryName = categories.find((category) => category.path === currentPath.category)?.name;

    if (categoryName) {
      dispatch(sortByCategory(categoryName));
    } else if (currentPath.category === 'all') {
      dispatch(fetchAllBooks());
    }
  }, [categories, currentPath, bookingID, dispatch]);

  return (
    <Wrapper>
      <div>
        <ButtonHide type='button' onClick={handleCategoryView} data-test-id='navigation-showcase'>
          <CustomAsidelink to='' type={isOpen ? 'fourth' : 'secondary'} state={{ name: 'Все книги', path: 'all' }}>
            <ContainerLink>
              <div>Витрина книг</div>
              {!errorCategories &&
                !error &&
                (isOpen ? <ArrowUpIcon fill='inherit' /> : <ArrowDownIcon fill='inherit' />)}
            </ContainerLink>
          </CustomAsidelink>
        </ButtonHide>

        {!errorCategories && !error && (
          <CategoryBox $isOpen={isOpen}>
            <CustomAsidelink
              to={`${ROUTE.BOOKS}${ROUTE.ALLBOOKS}`}
              type='tertiary'
              state={{ name: 'Все книги', path: 'all' }}
            >
              <div data-test-id='navigation-books'>Все книги</div>
            </CustomAsidelink>
            {categories.map(({ name, path }) => (
              <CustomAsidelink to={`${ROUTE.BOOKS}/${path}`} type='tertiary' key={uuidv4()} state={{ name, path }}>
                <p data-test-id={`navigation-${path}`}>{name}</p>
                <Amount $isActive={currentPath.category === path} data-test-id={`navigation-book-count-for-${path}`}>
                  {categoriesAmount[name] ? categoriesAmount[name] : 0}
                </Amount>
              </CustomAsidelink>
            ))}
          </CategoryBox>
        )}
      </div>
      <CustomAsidelink to={ROUTE.RULES} onClick={handleView} type='secondary'>
        <div data-test-id='navigation-terms'>Правила пользования</div>
      </CustomAsidelink>
      <CustomAsidelink to={ROUTE.OFFER} onClick={handleView} type='secondary' data-test-id='navigation-contract'>
        <div data-test-id='navigation-contract'>Договор оферты</div>
      </CustomAsidelink>
    </Wrapper>
  );
};
