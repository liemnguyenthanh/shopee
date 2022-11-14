import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../services/api';

export const fetchRoomListThunk: any = createAsyncThunk(
  'rooms/fetch',
  async () => axiosClient.get<any>(`/rooms/get_room_list`)
);
