import { createAsyncThunk } from '@reduxjs/toolkit';
import {themBan, capNhatBan, ipAddress} from '../../services/api'; // Đường dẫn tới API tương ứng
import {getBanTheoId} from '../../services/api';
import { Ban } from '../Slices/BanSlice';
import axios from 'axios';

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

  export const xoaBan = createAsyncThunk(
    'bans/xoaBan', 
    async ({ id_Ban, id_nhanVien, id_nhaHang }: { id_Ban: string; id_nhanVien: string; id_nhaHang: string }, thunkAPI) => {
      try {
        // Gửi yêu cầu DELETE đến API backend
        const response = await axios.delete(`${ipAddress}/xoaBan/${id_Ban}`, {
          data: { id_nhanVien, id_nhaHang }, // Gửi dữ liệu kèm theo yêu cầu DELETE
        });
  
        console.log(response.data);
        
        // Trả về dữ liệu phản hồi khi thành công
        return response.data;
      } catch (error: any) {
        // Xử lý lỗi từ server và trả về thông báo lỗi để Redux Toolkit sử dụng
        if (error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        } else if (error.request) {
          return thunkAPI.rejectWithValue({
            msg: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng!',
          });
        } else {
          return thunkAPI.rejectWithValue({ msg: error.message });
        }
      }
    }
  );