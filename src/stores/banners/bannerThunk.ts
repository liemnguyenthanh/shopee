import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../services/api';

export const fetchBannerThunk: any = createAsyncThunk(
  'banner/fetch/home',
  async () => await axiosClient.get<any[]>(`/banner/get_banner_home`)
);
