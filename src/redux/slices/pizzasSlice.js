import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzasRes = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params; //Вытаскиваем параметры через деструктуризацию

    const { data } = await axios.get(
      // делаем запрос
      `https://6633b2a9f7d50bbd9b4a6103.mockapi.io/items?${category}&limit=4&page=${
        currentPage + 1
      }&sortBy=${sortBy}&order=${order}${search}`
    );
    return data; // возвращаем масив пиц
  }
);
// pizza - берем название слайса
// fetchPizzaStatus - имя экшина
// Добавляем в слайс extraReducers:

const initialState = {
  pizzas: [],
  isLoading: "loadihg", // loadihg | success | error
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.pizzas = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPizzasRes.pending, (state) => {
        // Ожидание
        state.isLoading = "loadihg";
        state.items = [];
      })
      .addCase(fetchPizzasRes.fulfilled, (state, action) => {
        // Успешно
        state.pizzas = action.payload;
        state.isLoading = "success";
      })
      .addCase(fetchPizzasRes.rejected, (state) => {
        // Ошибка
        state.isLoading = "error";
        state.items = [];
      });
  },
});

// export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
