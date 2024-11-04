import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListChiTietHoaDon,
  addChiTietHoaDon,
  updateChiTietHoaDon,
  getListMonAn,
  addListChiTietHoaDon,
} from '../services/api';
import {MonAn} from './MonAnSlice';

// Interface định nghĩa cho ChiTietHoaDon
export interface ChiTietHoaDon {
  _id?: string;
  soLuongMon: number;
  giaTien: number;
  id_monAn: MonAn;
}

export interface ChiTietHoaDonState {
  chiTietHoaDons: ChiTietHoaDon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChiTietHoaDonState = {
  chiTietHoaDons: [],
  status: 'idle',
  error: null,
};

// Async thunk để lấy danh sách ChiTietHoaDon
export const fetchChiTietHoaDon = createAsyncThunk(
  'chiTietHoaDon/fetchChiTietHoaDon',
  async (id_chiTietHoaDon: string[], thunkAPI) => {
    try {
      const data = await getListChiTietHoaDon(id_chiTietHoaDon);
      return data;
    } catch (error: any) {
      console.log('Lỗi lấy danh sách:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error fetching ChiTietHoaDon',
      );
    }
  },
);

// Async thunk để thêm mới ChiTietHoaDon
export const addNewChiTietHoaDon = createAsyncThunk(
  'chiTietHoaDon/addNewChiTietHoaDon',
  async (
    {
      id_hoaDon,
      monAn,
    }: {
      id_hoaDon: string;
      monAn: Array<{id_monAn: string; soLuong: number; giaTien: number}>;
    },
    thunkAPI,
  ) => {
    try {
      const data = await addListChiTietHoaDon(id_hoaDon, monAn);
      return data;
    } catch (error: any) {
      console.log('Lỗi thêm mới Chi Tiết Hóa Đơn:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error adding ChiTietHoaDon',
      );
    }
  },
);

// Async thunk để cập nhật ChiTietHoaDon
export const updateChiTietHoaDonThunk = createAsyncThunk(
  'chiTietHoaDon/updateChiTietHoaDon',
  async ({id, formData}: {id: string; formData: ChiTietHoaDon}, thunkAPI) => {
    try {
      const data = await updateChiTietHoaDon(id, formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi cập nhật:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error updating ChiTietHoaDon',
      );
    }
  },
);

const chiTietHoaDonSlice = createSlice({
  name: 'chiTietHoaDon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChiTietHoaDon.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchChiTietHoaDon.fulfilled,
        (state, action: PayloadAction<ChiTietHoaDon[]>) => {
          state.status = 'succeeded';
          state.chiTietHoaDons = action.payload;
        },
      )
      .addCase(fetchChiTietHoaDon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch ChiTietHoaDon';
      })
      .addCase(
        addNewChiTietHoaDon.fulfilled,
        (state, action: PayloadAction<ChiTietHoaDon>) => {
          state.chiTietHoaDons.unshift(action.payload);
          state.status = 'succeeded';
        },
      )
      .addCase(addNewChiTietHoaDon.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Error adding ChiTietHoaDon';
      })
      .addCase(
        updateChiTietHoaDonThunk.fulfilled,
        (state, action: PayloadAction<ChiTietHoaDon>) => {
          const index = state.chiTietHoaDons.findIndex(
            cthd => cthd._id === action.payload._id,
          );
          if (index !== -1) {
            state.chiTietHoaDons[index] = action.payload;
          }
          state.status = 'succeeded';
        },
      )
      .addCase(updateChiTietHoaDonThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Error updating ChiTietHoaDon';
      });
  },
});

export default chiTietHoaDonSlice.reducer;
