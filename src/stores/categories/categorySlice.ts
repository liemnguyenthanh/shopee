import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../utils/types/Categories';
import { fetchCategoriesThunk } from './categoryThunk';

export interface FriendsState {
  categoriesHome: Category[]
}

const initialState: FriendsState = {
  categoriesHome: [],
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategoryRequest: (state, action: PayloadAction<Category>) => {
      console.log('createCategoryRequest', state, action);

      // state.categories.push(action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categoriesHome = action.payload.data;
      })
});

export const {
  createCategoryRequest,
} = categorySlice.actions;
export default categorySlice.reducer;
