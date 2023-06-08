import { Route, Routes } from 'react-router-dom';

import './App.less';
import Header from '../Header';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import PizzaFullPage from '../../pages/PizzaFullPage';
import NotFound from '../../pages/NotFound';
import MainLayout from '../layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaFullPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
