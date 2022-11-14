import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBannerThunk } from './bannerThunk';

export interface FriendsState {
  bannerHome: any[],
  supperSaleList: any[]
}

const initialState: FriendsState = {
  bannerHome: [],
  supperSaleList: []
};

export const bannerSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategoryRequest: (state, action: PayloadAction<any>) => {
      console.log('createCategoryRequest', state, action);

      // state.categories.push(action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBannerThunk.fulfilled, (state, action) => {
        state.bannerHome = action.payload.data;
      })
});

export const {
  createCategoryRequest,
} = bannerSlice.actions;
export default bannerSlice.reducer;
