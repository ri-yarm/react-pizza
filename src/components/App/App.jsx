import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import './App.less';
import Header from '../Header';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import NotFound from '../../pages/NotFound';

function App() {
  

  // const PizzaElements = pizzas.map((obj) => <Skeleton key={obj.id} {...obj} />);
  // const PizzaElements = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

