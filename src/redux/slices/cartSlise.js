import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // первоначальное состояние
  totalPrice: 0,
  items: [],
};

export const filtersSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        // ищим в state.items масив с таким id как в того который пришел в action.payload
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        // если в state.items нашли масив с таким id как в того который пришел в action.payload
        findItem.count++; // добавляем в этом масиве count +1
      } else {
        state.items.push({
          // если не нашли, то пушим новый масив со всеми даными с action.payload и добавляем count: 1.
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        // В totalPrice возвращаем суму price  с масыва покупок с помощью метода reduce()
        return sum + obj.price * obj.count;
      }, 0);
    },

    removeItem(state, action) {
      if (window.confirm("Хотите удалить?")) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
        state.totalPrice =
          state.totalPrice - action.payload.price * action.payload.count;
      }
    },

    clearItems(state) {
      if (state.items.length > 0) {
        if (window.confirm("Очистить корзину?")) {
          state.items = [];
          state.totalPrice = 0;
        }
      } else {
        alert("У Вас корзина пуста!");
      }
    },

    itemPlus(state, action) {
      const findItem = state.items.find(
        // ищим в state.items масив с таким id как в того который пришел в action.payload
        (item) => item.id === action.payload
      );
      findItem.count++;

      state.totalPrice = state.items.reduce((sum, obj) => {
        // В totalPrice возвращаем суму price  с масыва покупок с помощью метода reduce()
        return sum + obj.price * obj.count;
      }, 0);
    },

    itemMinus(state, action) {
      const findItem = state.items.find(
        // ищим в state.items масив с таким id как в того который пришел в action.payload
        (item) => item.id === action.payload
      );

      findItem.count > 1 ? findItem.count-- : (findItem.count = 1);

      state.totalPrice = state.items.reduce((sum, obj) => {
        // В totalPrice возвращаем суму price  с масыва покупок с помощью метода reduce()
        return sum + obj.price * obj.count;
      }, 0);
    },
  },
});

export const selectCart = (state) => state.cart; // Селектор

export const { addItem, removeItem, clearItems, itemPlus, itemMinus } =
  filtersSlice.actions;

export default filtersSlice.reducer;
