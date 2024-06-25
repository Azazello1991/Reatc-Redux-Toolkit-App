import React from "react";
import style from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={style.wrapper}>
      <span>😕</span>
      <h1 className={style.title}>Ничего не найдено</h1>
      <p className={style.description}>
        Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
        пиццу, перейди на главную страницу.
      </p>
    </div>
  );
};
export default NotFoundBlock;
