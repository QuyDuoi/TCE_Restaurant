import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { capNhatDanhMuc, getListDanhMuc, themDanhMuc, xoaDanhMuc } from '../screens/QuanLyThucDon/CallApiThucDon';

export interface DanhMuc {
  _id?: string;
  tenDanhMuc: string;
  id_nhaHang: string;
}

export interface DanhMucState {
  danhMucs: DanhMuc[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DanhMucState = {
  danhMucs: [],
  status: 'idle',
  error: null,
};

// Thunk để fetch danh sách danh mục
export const fetchDanhMucs = createAsyncThunk(
  'danhMucs/fetchDanhMucs',
  async (id_nhaHang: string, {rejectWithValue}) => {
    try {
      return await getListDanhMuc(id_nhaHang);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Không thể tải danh mục');
    }
  },
);

export const themDanhMucThunk = createAsyncThunk(
  'danhMucs/themDanhMuc',
  async (danhMuc: DanhMuc, {rejectWithValue}) => {
    try {
      return await themDanhMuc(danhMuc);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Không thể thêm danh mục');
    }
  },
);

export const capNhatDanhMucThunk = createAsyncThunk(
  'danhMucs/capNhatDanhMuc',
  async ({id, danhMuc}: {id: string; danhMuc: DanhMuc}, {rejectWithValue}) => {
    try {
      return await capNhatDanhMuc(id, danhMuc);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Không thể cập nhật danh mục');
    }
  },
);

export const deleteDanhMucThunk = createAsyncThunk(
  'danhMucs/deleteDanhMuc',
  async (id: string, {rejectWithValue}) => {
    try {
      await xoaDanhMuc(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Không thể xóa danh mục');
    }
  },
);

// Tạo DanhMucSlice
const danhMucSlice = createSlice({
  name: 'danhMucs',
  initialState,
  reducers: {
    moveItemUp: (state, action: PayloadAction<string>) => {
      const index = state.danhMucs.findIndex(item => item._id === action.payload);
      if (index > 0) {
        [state.danhMucs[index - 1], state.danhMucs[index]] = [
          state.danhMucs[index],
          state.danhMucs[index - 1],
        ];
      }
    },
    moveItemDown: (state, action: PayloadAction<string>) => {
      const index = state.danhMucs.findIndex(item => item._id === action.payload);
      if (index < state.danhMucs.length - 1) {
        [state.danhMucs[index], state.danhMucs[index + 1]] = [
          state.danhMucs[index + 1],
          state.danhMucs[index],
        ];
      }
    },
  },
  extraReducers: builder => {
    // Helper functions
    const handlePending = (state: DanhMucState) => {
      state.status = 'loading';
      state.error = null;
    };
    const handleRejected = (state: DanhMucState, action: PayloadAction<any>) => {
      state.status = 'failed';
      state.error = action.payload;
    };

    builder
      // Fetch
      .addCase(fetchDanhMucs.pending, handlePending)
      .addCase(fetchDanhMucs.fulfilled, (state, action: PayloadAction<DanhMuc[]>) => {
        state.status = 'succeeded';
        state.danhMucs = action.payload;
      })
      .addCase(fetchDanhMucs.rejected, handleRejected)

      // Thêm
      .addCase(themDanhMucThunk.pending, handlePending)
      .addCase(themDanhMucThunk.fulfilled, (state, action: PayloadAction<DanhMuc>) => {
        state.status = 'succeeded';
        state.danhMucs.unshift(action.payload);
      })
      .addCase(themDanhMucThunk.rejected, handleRejected)

      // Cập nhật
      .addCase(capNhatDanhMucThunk.pending, handlePending)
      .addCase(capNhatDanhMucThunk.fulfilled, (state, action: PayloadAction<DanhMuc>) => {
        const index = state.danhMucs.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.danhMucs[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(capNhatDanhMucThunk.rejected, handleRejected)

      // Xóa
      .addCase(deleteDanhMucThunk.pending, handlePending)
      .addCase(deleteDanhMucThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.danhMucs = state.danhMucs.filter(item => item._id !== action.payload);
      })
      .addCase(deleteDanhMucThunk.rejected, handleRejected);
  },
});

export const {moveItemUp, moveItemDown} = danhMucSlice.actions;
export default danhMucSlice.reducer;
