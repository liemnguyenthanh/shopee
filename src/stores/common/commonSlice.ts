import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomNameGenerator } from '../../utils/helpers';
import { IUser } from '../../utils/types/Users';
import { fetchProductThunk, fetchShopResultThunk } from './commonThunk';

export interface FetchingData<T> {
  isFetch: boolean,
  msg_error: string | null,
  isError: boolean,
  data: T,
}

export interface CommonState {
  user: IUser | null,
  tagList: string[],
  productList: any[],
  shopResult: FetchingData<any>
}

const initialState: CommonState = {
  user: null,
  tagList: ["Áo khoác", "Dép", "Mũ"],
  productList: [],
  shopResult: {
    isFetch: true,
    msg_error: null,
    data: {
      title: 'Huawei Offical Store',
      url: 'huawei_store',
      image: 'https://cf.shopee.vn/file/ed649388cfc7e3d12df7b796768fc9d1_tn',
      description: 'Tài trợ bởi huawei_flagship_store',
    },
    isError: false
  }
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    createCategoryRequest: (state, action: PayloadAction<any>) => {
      console.log('createCategoryRequest', state, action);

      // state.categories.push(action.payload);
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = {
        id: new Date().getTime(),
        username: action.payload,
        firstName: randomNameGenerator(4),
        lastName: randomNameGenerator(4),
      }
    },
  },
  extraReducers: {
    [fetchProductThunk.fulfilled]: (state, action) => {
      console.log('fetchProductThunk.fulfilled', action.payload);
      state.productList = action.payload.data;
    },
    [fetchShopResultThunk.fulfilled]: (state, action) => {
      // state.shopResult.data = 
    }
  }

});

export const {
  createCategoryRequest,
  setUser
} = commonSlice.actions;
export default commonSlice.reducer;
