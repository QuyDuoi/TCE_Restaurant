import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListDanhMuc,
  themDanhMuc,
  capNhatDanhMuc,
  xoaDanhMuc,
} from '../services/api'; // Đường dẫn tới API tương ứng
import MonAn from '../services/models/MonAnModel';

// Định nghĩa interface cho DanhMuc
export interface DanhMuc {
  _id?: string;
  tenDanhMuc: string;
  id_nhaHang: string;
}

// Định nghĩa state cho DanhMuc
export interface DanhMucState {
  danhMucs: DanhMuc[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Trạng thái ban đầu cho DanhMucSlice
const initialState: DanhMucState = {
  danhMucs: [],
  status: 'idle',
  error: null,
};

// Thunk để fetch danh sách danh mục
export const fetchDanhMucs = createAsyncThunk(
  'danhMucs/fetchDanhMucs',
  async (id_nhaHang: string) => {
    const data = await getListDanhMuc(id_nhaHang); // Gọi API để lấy danh sách danh mục
    return data; // Trả về dữ liệu
  },
);

export const themDanhMucThunk = createAsyncThunk(
  'danhMucs/themDanhMuc',
  async (danhMuc: DanhMuc, thunkAPI) => {
    try {
      const data = await themDanhMuc(danhMuc);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ msg: error.msg || 'Lỗi thêm danh mục mới'});
    }
  },
);

export const capNhatDanhMucThunk = createAsyncThunk(
  'danhMucs/capNhatDanhMuc',
  async ({id, danhMuc}: {id: string; danhMuc: DanhMuc}, thunkAPI) => {
    try {
      const data = await capNhatDanhMuc(id, danhMuc);
      return data;
    } catch (error: any) {
      console.log('Lỗi cập nhật:', error);
      return thunkAPI.rejectWithValue({ msg: error.msg || 'Lỗi cập nhật danh mục'});
    }
  },
);
export const deleteDanhMucThunk = createAsyncThunk(
  'danhMucs/deleteDanhMuc',
  async (id: string, thunkAPI) => {
    try {
      await xoaDanhMuc(id);
      return id;
    } catch (error: any) {
      console.log('Lỗi xóa:', error);
      return thunkAPI.rejectWithValue({ msg: error.msg || 'Lỗi xóa danh'});
    }
  },
);

// Tạo DanhMucSlice
const danhMucSlice = createSlice({
  name: 'danhMucs',
  initialState,
  reducers: {
    // Các reducers tùy chỉnh (nếu cần)
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDanhMucs.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchDanhMucs.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = 'succeeded';
          state.danhMucs = action.payload; // Cập nhật danh sách danh mục khi fetch thành công
        },
      )
      .addCase(fetchDanhMucs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Không thể lấy danh sách danh mục'; // Lỗi khi fetch thất bại
      })
      .addCase(themDanhMucThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.danhMucs.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(themDanhMucThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.msg || 'Lỗi thêm danh mục';
      })
      .addCase(
        capNhatDanhMucThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          const index = state.danhMucs.findIndex(
            cthd => cthd._id === action.payload._id,
          );
          if (index !== -1) {
            state.danhMucs[index] = action.payload;
          }
          state.status = 'succeeded';
        },
      )
      .addCase(capNhatDanhMucThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error updating DanhMuc';
      })
      .addCase(
        deleteDanhMucThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.danhMucs = state.danhMucs.filter(
            dm => dm._id !== action.payload,
          ); // Xóa danh mục khỏi danh sách
          state.status = 'succeeded';
        },
      )
      .addCase(deleteDanhMucThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error deleting DanhMuc';
      });
  },
});

// Export reducer để sử dụng trong store
export default danhMucSlice.reducer;
