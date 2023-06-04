import { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';

import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pizzas, setPizzas] = useState([]);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    property: 'rating',
  });
  console.log(sortType, categoryId);
  useEffect(() => {
    const category = categoryId > 0 ? categoryId : '';
    const sort = sortType.property.replace('-', '');
    const order = sortType.property.includes('-') ? 'asc' : 'desc';

    setIsLoading(true);
    axios(
      `https://64799bb4a455e257fa636986.mockapi.io/pizzas?category=${category}&sortBy=${sort}&order=${order}`
    ).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const pizzaElements = isLoading
    ? [...Array(10)].map((g, index) => <Skeleton key={index} />)
    : pizzas.map((el) => <PizzaBlock key={el.id} {...el} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          setValue={(index) => setCategoryId(index)}
        />
        <Sort value={sortType} setValue={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaElements}</div>
    </div>
  );
};

export default Home;
