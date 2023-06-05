import { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import './App.less';
import Header from '../Header';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import NotFound from '../../pages/NotFound';

export const Context = createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Context.Provider value={{searchValue, setSearchValue}}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
