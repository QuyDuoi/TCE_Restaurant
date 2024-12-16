import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListHoaDonTheoCaLam,
  getListHoaDonTheoNhaHang,
  addHoaDon,
  updateHoaDon,
  thanhToanHoaDon,
} from '../../services/api';
import {ChiTietHoaDon} from './ChiTietHoaDonSlice';
import {fetchKhuVucVaBan} from '../Thunks/khuVucThunks';

// Interface định nghĩa cho HoaDon
export interface HoaDon {
  _id?: string;
  tongGiaTri: number;
  trangThai: string;
  hinhThucThanhToan: boolean;
  id_nhanVien: string;
  tienGiamGia?: number;
  ghiChu?: string;
  id_ban?: string;
  thoiGianVao?: Date;
  thoiGianRa?: Date;
  tongTien?: number;
  id_caLamViec?: string;
  id_nhaHang?: string;
  nhanVienTao?: string;
  nhanVienThanhToan?: string;
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

// chua toi uu
export const fetchHoaDonTheoCaLam = createAsyncThunk(
  'hoaDon/fetchHoaDonTheoCaLam',
  async (id_caLamViec: string) => {
    try {
      const hoaDonsData = await getListHoaDonTheoCaLam(id_caLamViec);
      return hoaDonsData;
    } catch (error) {
      console.log('Lỗi lấy danh sách hoa đơn:', error);
      return [];
    }
  },
);

//chua toi uu
export const fetchHoaDonTheoNhaHang = createAsyncThunk(
  'hoaDon/fetchHoaDonTheoNhaHang',
  async (id_nhaHang: string) => {
    try {
      const hoaDonsData = await getListHoaDonTheoNhaHang(id_nhaHang);
      return hoaDonsData;
    } catch (error) {
      console.log('Lỗi lấy danh sách hoa đơn:', error);
      return [];
    }
  },
);

// Async thunk để thêm mới HoaDon
export const addNewHoaDon = createAsyncThunk(
  'hoaDon/addHoaDon',
  async (hoaDon: HoaDon, thunkAPI) => {
    try {
      const data = await addHoaDon(hoaDon);
      //console.log(data);
      thunkAPI.dispatch(fetchKhuVucVaBan(hoaDon.id_nhaHang as any));
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

// chua toi uu
export const thanhToanHoaDonThunk = createAsyncThunk(
  'hoaDon/thanhToanHoaDon',
  async (
    {
      id_hoaDon,
      tienGiamGia,
      hinhThucThanhToan,
      thoiGianRa,
      id_nhanVien,
    }: {
      id_hoaDon: string;
      tienGiamGia: number;
      hinhThucThanhToan: boolean;
      thoiGianRa: Date;
      id_nhanVien: string;
    },
    thunkAPI,
  ) => {
    try {
      const data = await thanhToanHoaDon(
        id_hoaDon,
        tienGiamGia,
        hinhThucThanhToan,
        thoiGianRa,
        id_nhanVien,
      );
      return data;
    } catch (error: any) {
      console.log('Lỗi thanh toán:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error thanh toán');
    }
  },
);

export const hoaDonSlice = createSlice({
  name: 'hoaDon',
  initialState,
  reducers: {
    themHoaDon: (state, action: PayloadAction<HoaDon>) => {
      state.hoaDons.unshift(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHoaDonTheoCaLam.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchHoaDonTheoCaLam.fulfilled,
        (state, action: PayloadAction<HoaDon[]>) => {
          state.status = 'succeeded';
          state.hoaDons = action.payload;
        },
      )
      .addCase(fetchHoaDonTheoCaLam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch hoaDons';
      })
      .addCase(fetchHoaDonTheoNhaHang.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchHoaDonTheoNhaHang.fulfilled,
        (state, action: PayloadAction<HoaDon[]>) => {
          state.status = 'succeeded';
          state.hoaDons = action.payload;
        },
      )
      .addCase(fetchHoaDonTheoNhaHang.rejected, (state, action) => {
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

export const {themHoaDon} = hoaDonSlice.actions;
export default hoaDonSlice.reducer;
