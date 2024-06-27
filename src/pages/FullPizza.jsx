import axios from "axios";
import React from "react";

import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  // Делаем запрос с помощью useParams():
  const params = useParams();
  const [pizza, setPizza] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzza() {
      try {
        const dataPizza = await axios.get(
          "https://6633b2a9f7d50bbd9b4a6103.mockapi.io/items/" + params.id
        );
        setPizza(dataPizza.data);

      } catch (error) {
        alert("Ошибка при получении данных");
        navigate('/'); //  ПЕренаправляем на главную
      }
    }
    fetchPizzza();
  }, [params.id]);
  // ==================================
  if (!pizza) {
    return "Loading...";
  }

  return (
    <li className="pizza-block">
      <img
        className="pizza-block__image"
        src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{pizza.title}</h4>
      <h3>{params.id}</h3>

      <div className="pizza-block__selector"></div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
        <button className="button button--outline button--add" type="button">
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
        </button>
      </div>
    </li>
  );
};

export default FullPizza;
