import { createSlice } from "@reduxjs/toolkit";

const initialState = { // первоначальное состояние 
  categoryId: 0,
  sortBy: {
    name: "популярности",
    sortProperty: "rating",
  }, 
  pageCount: 0,
};

export const filtersSlice = createSlice({ 
  name: "filters", 
  initialState: initialState,
  reducers: { 
    categoryOnClick: (state, action) => { // state - это initialState
      state.categoryId = action.payload; 
    },
    
    sortByOnClick: (state, action) => { 
      state.sortBy = action.payload.obj;
    },
    
    setPagination: (state, action) => { 
      state.pageCount = action.payload.selected;
    },

    setFilters: (state, action) => { 
      state.pageCount = Number(action.payload.currentPage); // присваиваем каждому параметку из initialState свое значение с payload
      state.categoryId = Number(action.payload.categoryId);
      state.sortBy = action.payload.sortBy;
    },
    
  },
});

export const selectSortBy = (state) => state.filters.sortBy;
export const selectPageCount = (state) => state.filters.pageCount;
export const selectCategoryId = (state) => state.filters.categoryId;

export const { categoryOnClick, sortByOnClick, setPagination, setFilters } = filtersSlice.actions; 

export default filtersSlice.reducer;