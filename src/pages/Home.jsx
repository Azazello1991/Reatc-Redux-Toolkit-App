import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom"; // парсинг строки url (qs)

// Components
import { AppContext } from "../App";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaSkileton from "../components/PizzaBlock/SkiletonPizza";
import Sort, { list } from "../components/Sort"; // обьект с параметрами для сортировки по...
import Pagination from "../components/pagination/Pagination";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectCategoryId, selectPageCount, selectSortBy, setFilters } from "../redux/slices/filtersSlice";
import { fetchPizzasRes } from "../redux/slices/pizzasSlice"; // передаем response
import PageError from "./Error/PageError";

// ========================== Home ============================ //

const Home = () => {
  const navigate = useNavigate();
  // redux
  const categoryId = useSelector(selectCategoryId);
  const currentPage = useSelector(selectPageCount); // первая страница пагинации
  const sortByOnClick = useSelector(selectSortBy);
  const { pizzas, isLoading } = useSelector((state) => state.pizzasSlice); // вытащили масив пицц с redux
  const dispatch = useDispatch();
  // Hooks
  const { searchValue } = React.useContext(AppContext); // context
  const isMounted = React.useRef(false); // toggle для первого рендера (current: false)

  // ==================== useEffect для отслеживания строки URL:
  React.useEffect(() => {
    // розбираем строку
    if (window.location.search) { // если параметры есть, то превращаем в обьект
      const params = qs.parse(window.location.search.substring(1)); // вырезаем "?" и конвертируем в обьект {categoryId: '0', sortBy: 'rating', currentPage: '0'}
      const sortBy = list.find((obj) => obj.sortProperty === params.sortBy); // ищим совпадение в list и спарсеного qs обьекта

      dispatch(
        setFilters({
          ...params, // так как это обьек передаем КАЖДЫЙ элемент с помощью ...
          sortBy, // отфильтрованый обьек с числа параметров
        })
      );
    }
  }, []);

  // ===================== функция асинхронная запроса на бек энд:
  const fetchPizza = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortByOnClick.sortProperty.replace("-", "");
    const order = sortByOnClick.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    // Вар №! (асинхронная функция):
    // try {
    //   dispatch(fetchPizzasRes({ // запускаем асинхронный экшн с redux (передаем параметры)
    //     category,
    //     sortBy,
    //     order,
    //     search,
    //     currentPage,
    //   }));

    // } catch (error) {
    //   console.log("ERROR", error); // ERROR 404

    // } finally {
    //   // Выполнится при любом сценарии толи ошибка, толи все ок Можно добавить код который выполнится в любом из сценариев
    //   setIsLoading(false); // код при любом сценарии (все ровно заканчиваем загрузку)
    // }

    // Вариант №2 (вызов createAsyncThunk вredux):
    dispatch(
      fetchPizzasRes({
        // запускаем асинхронный экшн с redux (передаем параметры)
        category,
        sortBy,
        order,
        search,
        currentPage,
      })
    );
  };

  // ================= useEffect бля проверки на первый рендер
  React.useEffect(() => {
    // создаем строку
    if (isMounted.current === true) {
      // если в isMounted значение true,выполняем код
      const queryString = qs.stringify({
        // превращаем обьек в строку
        categoryId: categoryId, // ключи можно любые
        sortBy: sortByOnClick.sortProperty,
        currentPage: currentPage,
      });
      navigate(`?${queryString}`); // navigate впишет в url нашу строку
    }
    isMounted.current = true;
  }, [categoryId, sortByOnClick, currentPage]); // параметры за которыми слидим

  // ================== useEffect который делает axios запрос при изменении даных:
  React.useEffect(() => {
    // Варю №1 (axios):
    // Parameters
    // const category = categoryId > 0 ? `category=${categoryId}` : "";
    // const sortBy = sortByOnClick.sortProperty.replace("-", "");
    // const order = sortByOnClick.sortProperty.includes("-") ? "asc" : "desc";
    // const search = searchValue ? `&search=${searchValue}` : "";

    // axios
    //   .get(
    //     `https://6633b2a9f7d50bbd9b4a6103.mockapi.io/items?${category}&limit=4&page=${
    //       currentPage + 1
    //     }&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((response) => { // если запрос не ошибка, выполняем код
    //     setItems(response.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => { // если получили ошибку, то:
    //     setIsLoading(false); // все ровно заканчиваем загрузку
    //     console.log(err);
    //   });

    // Варю №2 (axios + async/await):
    fetchPizza();

    window.scrollTo(0, 0); // будет скролить сразу вверх
  }, [categoryId, searchValue, sortByOnClick, currentPage]); // [] did mount

  // ================== Мапинг блоков пицц:
  const arrMap =
    pizzas && pizzas.map((item, i) => <PizzaBlock key={item.id} {...item} />);
  // ================== Мапинг скилетонов:
  const skeletons = [...new Array(6)].map((_, i) => <PizzaSkileton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        {/* При клике запустится стрелочная функция где через map() присвоится ей параметр id и передается */}
        {/* во внутрь функции setActiveCategorys(3) */}
        {/* а тут setActiveCategorys получит index===3 и присвоит его activeCategorys, которое было 0 */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {isLoading === "error" ? (
        <PageError/>
      ) : (
        <ul className="content__items">
          {isLoading === "loadihg" ? skeletons : arrMap}
        </ul>
      )}
      <Pagination />
    </>
  );
};

export default Home;
