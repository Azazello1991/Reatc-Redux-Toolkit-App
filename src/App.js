import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./scss/app.scss";
// components
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

// context
export const AppContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="App">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="pizza/:id" element={<FullPizza />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );

  {
    /* <div className="App">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />

          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/pizza/:id" element={<FullPizza />} />
              </Routes>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </div>
  ); */
  }
}

export default App;
