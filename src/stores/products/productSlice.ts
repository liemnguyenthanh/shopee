import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateProduct } from '../../utils/datafake';
import { Product } from '../../utils/types/Products';
import { fetchCategoriesThunk } from './productThunk';

export interface ProductState {
  proListHome: Product[],
}

const initialState: ProductState = {
  proListHome: generateProduct(),
};

export const cartSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    createCategoryRequest: (state, action: PayloadAction<any>) => {
      console.log('createCategoryRequest', state, action);

      // state.categories.push(action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.proListHome = action.payload.data;
      })
});

export const {
  createCategoryRequest,
} = cartSlice.actions;
export default cartSlice.reducer;
