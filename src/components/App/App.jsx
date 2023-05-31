import { useState } from 'react';
/* import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'; */
// import '../../styles/main.less';

import './App.less'
import Header from '../Header';
import Categories from '../categories';
import Sort from '../Sort';
import Button from '../Button';
import PizzaBlock from '../PizzaBlock';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
              <PizzaBlock />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

