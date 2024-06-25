import React from "react";
// redux
// import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import PageError from "./pages/Error/PageError";
//redux
import { useSelector } from "react-redux";

export const AppContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const status = useSelector((state) => state.pizzasSlice.status);

  return (
    <div className="App">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />

          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
