import React from "react";
import style from './PageError.module.css'
import { Link } from "react-router-dom";

const PageError = () => {
  return (
    <div className={style.room}>
      <div className={style.cuboid}>
        <div className={style.side}></div>
        <div className={style.side}></div>
        <div className={style.side}></div>
      </div>
      <div className={style.oops}>
        <h2>OOPS!</h2>
        <p>We can't find the page that you're looking for :(</p>
      </div>
      <div className={style.centerLine}>
        <div className={style.hole}>
          <div className={style.ladderShadow}></div>
          <div className={style.ladder}></div>
        </div>
        <div className={style.four}>4</div>
        <div className={style.four}>4</div>
        <div className={style.btn}>
          <Link to="http://localhost:3000">BACK TO HOME</Link>
        </div>
      </div>
    </div>
  );
};

export default PageError;
