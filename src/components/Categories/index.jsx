import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterslice';

import './Categories.less';

const Categories = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);

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
        className={`${categoryId === index ? 'active' : ''}`}
        key={index}
        onClick={() => dispatch(setCategoryId(index))}
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
