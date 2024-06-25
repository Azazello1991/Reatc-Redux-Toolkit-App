import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./slices/filtersSlice";
import cartSlice from "./slices/cartSlise";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    cart: cartSlice,
    pizzasSlice: pizzasSlice,
  },
});
