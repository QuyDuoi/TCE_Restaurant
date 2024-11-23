import { createAsyncThunk } from '@reduxjs/toolkit';
import {themBan, capNhatBan} from '../../services/api'; // Đường dẫn tới API tương ứng
import {getBanTheoId} from '../../services/api';
import { Ban } from '../Slices/BanSlice';

// Async thunk để thêm mới Bàn
export const themBanThunk = createAsyncThunk(
    'bans/addBans',
    async (ban: Ban, thunkAPI) => {
      try {
        const data = await themBan(ban);
        return data;
      } catch (error: any) {
        console.log('Lỗi thêm mới:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error adding Bàn');
      }
    },
  );
  // Async thunk để cập nhật Bàn
  export const capNhatBanThunk = createAsyncThunk(
    'bans/updateBans',
    async ({id, ban}: {id: string; ban: Ban}, thunkAPI) => {
      try {
        const data = await capNhatBan(id, ban);
        return data;
      } catch (error: any) {
        console.log('Lỗi cập nhật:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error updating Bàn');
      }
    },
  );
  // Thunk để fetch món ăn
  export const fetchBanTheoId = createAsyncThunk(
    'bans/fetchBanTheoId',
    async (id_Ban: String) => {
      const data = await getBanTheoId(id_Ban);
      return data; // Trả về dữ liệu
    },
  );