import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getListHoaDon, addHoaDon, updateHoaDon} from '../services/api';
import {ChiTietHoaDon} from './ChiTietHoaDonSlice';

// Interface định nghĩa cho HoaDon
export interface HoaDon {
  _id?: string;
  tongGiaTri: number;
  trangThai: string;
  hinhThucThanhToan: boolean;
  id_caLamViec: string;
  id_chiTietHoaDon: string[];
  id_nhanVien: string;
  tienGiamGia?: number;
  ghiChu?: string;
  id_ban?: string;
  thoiGianVaoBan?: Date;
  thoiGianRaBan?: Date;
}

export interface HoaDonState {
  hoaDons: HoaDon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HoaDonState = {
  hoaDons: [],
  status: 'idle',
  error: null,
};

// Async thunk để lấy danh sách HoaDon
export const fetchHoaDon = createAsyncThunk(
  'hoaDon/fetchHoaDon',
  async (id_caLam: string) => {
    const hoaDonsData = await getListHoaDon(id_caLam);
    return hoaDonsData;
  },
);

// Async thunk để thêm mới HoaDon
export const addNewHoaDon = createAsyncThunk(
  'hoaDon/addHoaDon',
  async (formData: HoaDon, thunkAPI) => {
    try {
      const data = await addHoaDon(formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi thêm mới:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error adding HoaDon');
    }
  },
);

// Async thunk để cập nhật HoaDon
export const updateHoaDonThunk = createAsyncThunk(
  'hoaDon/updateHoaDon',
  async ({id, formData}: {id: string; formData: HoaDon}, thunkAPI) => {
    try {
      const data = await updateHoaDon(id, formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi cập nhật:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error updating HoaDon');
    }
  },
);

const hoaDonSlice = createSlice({
  name: 'hoaDon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHoaDon.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchHoaDon.fulfilled,
        (state, action: PayloadAction<HoaDon[]>) => {
          state.status = 'succeeded';
          state.hoaDons = action.payload;
        },
      )
      .addCase(fetchHoaDon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch hoaDons';
      })
      .addCase(
        addNewHoaDon.fulfilled,
        (state, action: PayloadAction<HoaDon>) => {
          state.hoaDons.unshift(action.payload);
          state.status = 'succeeded';
        },
      )
      .addCase(addNewHoaDon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error adding hoaDon';
      })
      .addCase(
        updateHoaDonThunk.fulfilled,
        (state, action: PayloadAction<HoaDon>) => {
          const index = state.hoaDons.findIndex(
            hd => hd._id === action.payload._id,
          );
          if (index !== -1) {
            state.hoaDons[index] = action.payload;
          }
          state.status = 'succeeded';
        },
      )
      .addCase(updateHoaDonThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error updating hoaDon';
      });
  },
});

export default hoaDonSlice.reducer;
