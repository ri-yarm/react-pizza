import { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { Context } from '../App/App';

import styles from './Search.module.less';

const Search = () => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');
  const { searchValue, setSearchValue } = useContext(Context);

  // При клике удаляем содержимое инпута и ставим на него фокус
  const onClickExit = () => {
    setSearchValue('');
    setInputValue('')
    inputRef.current.focus();
  };

  // Ставим значение инпуту через 400мс. Благодаря useCallback функция не пересоздаётся
  const onSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 400),
    []
  );

  /**
   * @setInputValue сохраняет значение инпута в свой стейт,
   * @onSearchValue Сохраняет значение инпута в глобальный стейт,
   * а благодаря @onSearchValue , делает этот через 400мс
   */
  const OnChangeInput = (e) => {
    setInputValue(e.target.value);
    onSearchValue(inputValue);
  };

  return (
    <div className={styles.container}>
      <svg
        className={styles.svg_lupa}
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={OnChangeInput}
        className={styles.input}
        // type="search"
        type="text"
        placeholder="Поиск пиццы ..."
      />
      {searchValue && (
        <svg
          onClick={onClickExit}
          className={styles.svg_x}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      )}
    </div>
  );
};

export default Search;
