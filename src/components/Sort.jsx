import React from "react";
// redux
import { sortByOnClick } from "../redux/slices/filtersSlice";
import { useSelector, useDispatch } from "react-redux";

export const list = [
  { name: "популярности(ASC)", sortProperty: "rating" },
  { name: "популярности(DEST)", sortProperty: "-rating" },
  { name: "цене(ASC)", sortProperty: "price" },
  { name: "цене(DEST)", sortProperty: "-price" },
  { name: "алфавиту(ASC)", sortProperty: "title" },
  { name: "алфавиту(DEST)", sortProperty: "-title" },
];

function Sort() {
  const sortOnClick = useSelector((state) => state.filters.sortBy);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = React.useState(false);
  const sortRef = React.useRef(); // ссылка для логики закрытия попап

  const openListSelected = (obj) => {
    dispatch(sortByOnClick({ obj }));
    setOpenPopup(!openPopup);
  };

  // Закрытие попап если не на него кликнули:
  React.useEffect(() => { // did mount (когда компонент будет умерать сделай return)
    const handleClickOutside = (e) => { // Помещаем функцию в переменную:
      if (!e.composedPath().includes(sortRef.current)) { // если в смасиве e.composedPath() нету совпадения с сылкой на попап, то:
        setOpenPopup(false)
        // console.log('click outside')
      }
    }
    document.body.addEventListener("click", handleClickOutside); // При клике всне попап запускаем нашу функцию:

    return () => { // on mount (монтируется функция)
      document.body.removeEventListener("click", handleClickOutside); // удаляем обработчик события (иначе они будут сумироватся при каждом монтировании)
    }
  });

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenPopup(!openPopup)}>{sortOnClick.name}</span>
      </div>
      {openPopup && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                className={sortOnClick === i ? "active" : ""}
                key={i}
                onClick={() => openListSelected(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
