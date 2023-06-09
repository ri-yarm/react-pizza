import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import { sortList } from '../../components/Sort';

import filterslice, { selectFilter, setFilters } from '../../components/redux/slices/filterslice';
import { fetchPizzas, selectPizza } from '../../components/redux/slices/pizzaSlice';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';

import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Pagination from '../../components/Pagination';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizza);

  // запрос к api. Получение пицц через экшен редакса
  const fetchAndUsePizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType = sort.property.replace('-', '');
    const order = sort.property.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // ! передаём всё в слайс
    dispatch(
      // @ts-ignore
      fetchPizzas({
        category,
        sortType,
        order,
        search,
        currentPage,
      })
    );
  };

  const pizza = pizzas.map((el: any) => <PizzaBlock key={el.id} {...el} />);
  /** скелетоны для пицц */
  const skeleton = [...Array(10)].map((_, index) => <Skeleton key={index} />);
  const pizzaElements = status === 'loading' ? skeleton : pizza;

  // Если был перерендер, сохраняем в в редакс то что находится в url строке
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.property === params.sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    // при отрисовке компонента прыгаем в начало страницы
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchAndUsePizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, searchValue]);

  // Если параметы сортировки были изменены и был перендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sort: sort.property,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {status === 'error' ? (
        <h2
          style={{ textAlign: 'center', margin: 120 }}
          className="content__title"
        >
          Произошло страшное... <br /> Ваши пиццы не загрузились((
        </h2>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{pizzaElements}</div>
        </>
      )}
      {categoryId === 0 ? <Pagination /> : ''}
    </div>
  );
};

export default Home;
