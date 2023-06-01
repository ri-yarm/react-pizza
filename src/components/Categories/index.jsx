import { useState } from 'react';

import './Categories.less';

const Categories = () => {
  const [active, setActive] = useState(0);

  const onClickCategory = (index) => setActive(index);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const categoriesElement = categories.map((el, index) => {
    return (
      <li
        className={`${active === index ? 'active' : ''}`}
        key={index}
        onClick={() => onClickCategory(index)}
      >
        {el}
      </li>
    );
  });

  return (
    <div className="categories">
      <ul>{categoriesElement}</ul>
    </div>
  );
};

export default Categories;
