import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient, config } from '../../services/api';

export const fetchCategoriesThunk = createAsyncThunk('categories/fetch', () =>
  (id: string) => axiosClient.get<any>(`/todos/${id}`, config)
);
