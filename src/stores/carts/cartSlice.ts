import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../utils/types/Products';
import { fetchCategoriesThunk } from './cartThunk';

export interface CartState {
  cartList: Product[],
}
const data_test = [
  {
    name: "máy ảnh đỉnh cao ảnh đỉnh cao ",
    pure_name: 'may-an',
    price: '100000',
    image: '100000',
    total_sale: ' 200k',
  },
  {
    name: "máy ảnh đỉnh cao ảnh đỉnh cao ",
    pure_name: 'may-an',
    price: '100000',
    image: '100000',
    total_sale: ' 200k',
  }
]

const initialState: CartState = {
  cartList: data_test,
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
        state.cartList = action.payload.data;
      })
});

export const {
  createCategoryRequest,
} = cartSlice.actions;
export default cartSlice.reducer;
