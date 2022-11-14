import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient, config } from '../../services/api';

export interface ProductRequest {
  [name: string]: any
}

export const fetchProductThunk: any = createAsyncThunk(
  'common/requests/fetch',
  (id: string) => axiosClient.get<ProductRequest>(`/todos/${id}`, config)
);

export const fetchShopResultThunk: any = createAsyncThunk(
  'common_shop/requests/fetch',
  (keyword: string) => axiosClient.get<any>(`/shops`)
);
