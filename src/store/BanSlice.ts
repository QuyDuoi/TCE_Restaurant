import {getListKhuVuc} from './../services/api';
// slices/BanSlice.ts
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getListBan, addBan, updateBan} from '../services/api'; // Đường dẫn tới API tương ứng
import KhuVuc from '../services/models/KhuVucModel';
const idNhaHang = '66fab50fa28ec489c7137537';
// Định nghĩa interface cho Ban
export interface Ban {
  _id?: string;
  tenBan: string;
  sucChua: number;
  trangThai: string;
  ghiChu: string;
  id_khuVuc: KhuVuc;
}

// Định nghĩa state cho Ban
export interface BanState {
  bans: Ban[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Trạng thái ban đầu cho BanSlice
const initialState: BanState = {
  bans: [],
  status: 'idle',
  error: null,
};

// Thunk để fetch danh sách bàn
export const fetchBans = createAsyncThunk('bans/fetchBans', async () => {
  //const data = await getListBan(idKhuVuc); // Gọi API để lấy danh sách bàn
  const khuVucs = await getListKhuVuc(idNhaHang);

  const allBansResponse = await Promise.all(
    khuVucs.map(kv => {
      return getListBan(kv._id as string);
    }),
  );

  const allBansWithKhuVuc = allBansResponse.flatMap(
    (response: any, index: number) => {
      return response.map((ban: Ban) => {
        return {
          ...ban,
          kv: khuVucs[index],
        };
      });
    },
  );

  //console.log(allBansWithKhuVuc);

  return allBansWithKhuVuc as any;
});
// Async thunk để thêm mới Bàn
export const addNewBan = createAsyncThunk(
  'bans/addBans',
  async (formData: Ban, thunkAPI) => {
    try {
      const data = await addBan(formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi thêm mới:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error adding Bàn');
    }
  },
);
// Async thunk để cập nhật Bàn
export const updateBanThunk = createAsyncThunk(
  'bans/updateBans',
  async ({id, formData}: {id: string; formData: Ban}, thunkAPI) => {
    try {
      const data = await updateBan(id, formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi cập nhật:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error updating Bàn');
    }
  },
);

// Tạo BanSlice
const banSlice = createSlice({
  name: 'bans',
  initialState,
  reducers: {
    // Các reducers tùy chỉnh (nếu cần)
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBans.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBans.fulfilled, (state, action: PayloadAction<Ban[]>) => {
        state.status = 'succeeded';
        state.bans = action.payload; // Cập nhật danh sách bàn khi fetch thành công
      })
      .addCase(fetchBans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch bàn'; // Lỗi khi fetch thất bại
      })
      .addCase(addNewBan.fulfilled, (state, action: PayloadAction<Ban>) => {
        state.bans.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addNewBan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error adding Bàn';
      })
      .addCase(updateBanThunk.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        updateBanThunk.fulfilled,
        (state, action: PayloadAction<Ban>) => {
          const index = state.bans.findIndex(
            ban => ban._id === action.payload._id,
          );
          if (index !== -1) {
            state.bans[index] = {...state.bans[index], ...action.payload};
          }
          state.status = 'succeeded';
        },
      )
      .addCase(updateBanThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error updating Bàn';
      });
  },
});

// Export reducer để sử dụng trong store
export default banSlice.reducer;
