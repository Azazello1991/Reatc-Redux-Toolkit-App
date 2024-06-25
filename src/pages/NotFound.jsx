import React from "react";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";
import style from "./NotFound.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <NotFoundBlock />
      <Link to="/">
        <button className={style.btn}>Back</button>
      </Link>
    </>
  );
};
export default NotFound;
