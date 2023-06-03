import { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../../components/Categories';
import Sort from '../../components/Sort';

import PizzaBlock from '../../components/PizzaBlock';
import Skeleton from '../../components/PizzaBlock/Skeleton';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios('https://64799bb4a455e257fa636986.mockapi.io/pizzas').then((res) => {
      setPizzas(res.data);
      setIsLoading(true);
    });
  }, []);

  const pizzaElements = isLoading
    ? pizzas.map((el) => <PizzaBlock key={el.id} {...el} />)
    : [...Array(10)].map((g, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzaElements}</div>
    </div>
  );
};

export default Home;
