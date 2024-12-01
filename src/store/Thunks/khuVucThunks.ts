import { createAsyncThunk } from '@reduxjs/toolkit';
import {themKhuVuc, layDsKhuVuc, capNhatKhuVuc} from '../../services/api'; // Đường dẫn tới API tương ứng
import { KhuVuc } from '../Slices/KhuVucSlice';
import { setBans } from '../Slices/BanSlice';

// Thunk để fetch danh sách khu vực
export const fetchKhuVucVaBan = createAsyncThunk(
    'khuVucs/fetchKhuVucVaBan',
    async (id_nhaHang: string, thunkAPI) => {
      try {
        const data = await layDsKhuVuc(id_nhaHang); // Gọi API để lấy danh sách khu vực
  
        const bansData = data.flatMap(item => item.bans);
        console.log("Dữ liệu món ăn:", bansData);
        if (bansData.length > 0) {
          thunkAPI.dispatch(setBans(bansData));
        } else {
          console.log("Không có món ăn nào để dispatch.");
        }

        return data; // Trả về dữ liệu
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message || 'Error fetching KhuVuc');
      }
    },
  );
  
  export const themKhuVucThunk = createAsyncThunk(
    'khuVucs/themKhuVuc',
    async (khuVuc: KhuVuc, thunkAPI) => {
      try {
        const data = await themKhuVuc(khuVuc);
        return data;
      } catch (error: any) {
        console.log('Lỗi thêm mới:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error adding KhuVuc');
      }
    },
  );
  
  export const capNhatKhuVucThunk = createAsyncThunk(
    'khuVucs/capNhatKhuVuc',
    async ({id, formData}: {id: string; formData: KhuVuc}, thunkAPI) => {
      try {
        const data = await capNhatKhuVuc(id, formData);
        return data;
      } catch (error: any) {
        console.log('Lỗi cập nhật:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error updating KhuVuc');
      }
    },
  );