import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Context } from '../../components/App/App';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';

import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';
import Pagination from '../../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();

  const {categoryId, sort, currentPage} = useSelector((state) => state.filterSlice);

  const { searchValue } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [pizzas, setPizzas] = useState([]);



  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType = sort.property.replace('-', '');
    const order = sort.property.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    axios(
      `https://64799bb4a455e257fa636986.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`
    ).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
    // при отрисовке компонента прыгаем в начало страницы
    window.scrollTo(0, 0);
  }, [categoryId, sort, currentPage, searchValue]);

  const pizza = pizzas.map((el) => <PizzaBlock key={el.id} {...el} />);

  /** скелетоны для пицц */
  const skeleton = [...Array(10)].map((_, index) => <Skeleton key={index} />);

  const pizzaElements = isLoading ? skeleton : pizza;

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaElements}</div>
      {categoryId === 0 ? <Pagination  /> : ''}
    </div>
  );
};

export default Home;
