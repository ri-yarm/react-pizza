import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import { Context } from '../../components/App/App';

import { sortList } from '../../components/Sort';

import { setFilters } from '../../components/redux/slices/filterslice';
import { setPizzas } from '../../components/redux/slices/pizzaSlice';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';

import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Pagination from '../../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const { searchValue } = useContext(Context);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const { pizzas } = useSelector((state) => state.pizzaSlice);

  // запрос к api. Получение пицц
  const fetchPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType = sort.property.replace('-', '');
    const order = sort.property.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    axios(
      `https://64799bb4a455e257fa636986.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
    ).then((res) => {
      dispatch(setPizzas(res.data));
      setIsLoading(false);
    });
  };

  const pizza = pizzas.map((el) => <PizzaBlock key={el.id} {...el} />);
  /** скелетоны для пицц */
  const skeleton = [...Array(10)].map((_, index) => <Skeleton key={index} />);
  const pizzaElements = isLoading ? skeleton : pizza;

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
      fetchPizzas();
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
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaElements}</div>
      {categoryId === 0 ? <Pagination /> : ''}
    </div>
  );
};

export default Home;
