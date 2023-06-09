import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorCart } from '../redux/slices/cartSlice';

import Button from '../Button';
import Search from '../Search';
import './Header.less';

import logo from '../../assets/react-logo.svg';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { items, totalPrice } = useSelector(selectorCart);
  // Общее кол-во элементов
  const totalCount = items.reduce((acc: number, el: any) => acc + el.count, 0);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza v2 by Rinat</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname !== '/cart' && (
          <>
            <Search />
            <div className="header__cart">
              <Button totalPrice={totalPrice} totalCount={totalCount} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
