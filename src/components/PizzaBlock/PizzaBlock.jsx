import React from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlise";

function PizzaBlock({ price, title, sizes, types, id }) {
  //hooks
  const [sizeActive, setSizeCout] = React.useState(0);
  const [typeActive, setTypeActive] = React.useState(0);
  // redux
  const dispatch = useDispatch();
  // Ищим совпадение пицц которые рендерятся и те которые заказали, что б узнать сколько штук и вывести количество возле кнопки "заказать"
  const cartItem = useSelector((state) => 
    state.cart.items.find((obj) => obj.id === id)
  );

  // Если есть такой товар в корзине то передаем count, если нету то 0:
  const itemCount = cartItem ? cartItem.count : 0;

  const typesNames = ["тонкое", "традиционное"];
  const clickSize = (i) => {
    setSizeCout(i);
  };
  const onClickAdd = () => {
    // Создаем обьект который будим передавать в корзину при клике "добавить"
    const item = {
      id,
      title,
      price,
      types: typesNames[typeActive],
      size: sizeActive,
    };
    dispatch(addItem(item));
  };

  return (
    <li className="pizza-block">
      <img
        className="pizza-block__image"
        src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>

      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              key={i}
              className={typeActive === i ? "active" : ""}
              onClick={() => setTypeActive(i)} // можно сразу (пр2), если вызов одной функции
            >
              {typesNames[type]}
            </li>
          ))}
        </ul>

        <ul>
          {sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => clickSize(i)} // колбек (пр1)
              className={sizeActive === i ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
          type="button" /* onClick={clickCout} */
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          { cartItem && <i>{itemCount}</i>}
        </button>
      </div>
    </li>
  );
}
export default PizzaBlock;
