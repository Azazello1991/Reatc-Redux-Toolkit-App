import React from "react";
// redux
import { categoryOnClick } from '../redux/slices/filtersSlice';
import { useSelector, useDispatch } from 'react-redux'

function Categories() {
  const categoryId = useSelector((state) => state.filters.categoryId)
  const dispatch = useDispatch()
  const categories = [
    {
      name: "Все",
      id: 0,
    },
    {
      name: "Мясные",
      id: 1,
    },
    {
      name: "Вегетарианская",
      id: 2,
    },
    {
      name: "Гриль",
      id: 3,
    },
    {
      name: "Острые",
      id: 4,
    },
    {
      name: "Закрытые",
      id: 5,
    },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((nameCategory, i) => {
          return (
            <li
              key={nameCategory.id}
              onClick={() => dispatch(categoryOnClick(i))} // передали номер "i" каждой onClickCategory(i) и возовится с этим номером
              className={categoryId === i ? "active" : ""}
            >
              {nameCategory.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;