import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../services/api';
import { Category } from '../../utils/types/Categories';

export const fetchCategoriesThunk: any = createAsyncThunk(
  'categories/fetch/home',
  async () => await axiosClient.get<Category[]>(`/categories/home`)
);
