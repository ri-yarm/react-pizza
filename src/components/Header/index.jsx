import Button from '../Button';
import './Header.less';

import logo from '../../assets/react-logo.svg'

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img width="38" src={logo} alt="Pizza logo" />
          <div>
            <h1>React Pizza v2 by Rinat</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
        <div className="header__cart">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default Header;
