import React from "react";
import style from "./Search.module.scss";
import { AppContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
  const [value, setValue] = React.useState(''); // создаем хук для локального хранения (debounce)
  const { searchValue, setSearchValue } = React.useContext(AppContext); // через Context вытаскиваем хук searchValue
  const inputRef = React.useRef(); // Хук для ссылки

  const onClickClear = () => { // при нажатии "на очистить поле"
    setValue('');
    setSearchValue(''); // Передаем пустую строку
    inputRef.current.focus(); // Обращаемся к элементу и оставляем на нем фокус
  };

  const onChangeInpute = (event) => { // при вводе в поле поиска в метода onChange можна задавать event
    setValue(event.target.value); // передаем изменения с поля поиска в хук searchValue
    updateSearchValue(event.target.value); // запускаем наху функцию с задержкой и передаем значение поля
  };

  const updateSearchValue = React.useCallback( // что б при перерендере заново не запускалась наша функция debounce обворачиваем в хук useCallback
    debounce((str) => {  // сохранили ссылку на функцию и сделали ее отложеной
      setSearchValue(str);
    }, 1000),[] // если в течении 1000мс значение в str не меняется, передаем в setSearchValue(str)
  );

  return (
    <div className={style.search}>
      <input
        ref={inputRef} // добавляем ссылку элементу
        onChange={onChangeInpute}
        className={style.input}
        placeholder="Поикс..."
        type="text"
        value={value}
      />
      {value && (
        <span className={style.close} onClick={onClickClear}></span>
      )}
    </div>
  );
};

export default Search;
