import { useState } from 'react';
/* import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'; */
// import '../../styles/main.less';

import './App.less';
import Header from '../Header';
import Categories from '../Categories';
import Sort from '../Sort';
import Button from '../Button';
import PizzaBlock from '../PizzaBlock';

import PIZZAS from '../../assets/pizzas.json';

function App() {
  const [count, setCount] = useState(0);

  const PizzaElements = PIZZAS.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{PizzaElements}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

