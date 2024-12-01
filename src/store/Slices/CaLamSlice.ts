import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getListCaLam,
  getListChiTietHoaDonTheoCaLam,
  getListNhanVien,
  moCaLamViec
} from '../../services/api';
import {NhanVienSlice} from './NhanVienSlice';
import {ChiTietHoaDon} from './ChiTietHoaDonSlice';

export interface CaLam {
  _id?: string;
  batDau?: Date;
  ketThuc?: Date;
  soDuBanDau: string;
  soDuHienTai?: number;
  tongTienMat?: number;
  tongChuyenKhoan?: number;
  tongDoanhThu?: number;
  tongThu?: number;
  tongChi?: number;
  id_nhanVien: string;
  id_nhaHang: string;
}

export interface CaLamState {
  caLams: CaLam[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
  chiTietHoaDons: ChiTietHoaDon[];
}

const initialState: CaLamState = {
  caLams: [],
  status: 'idle',
  error: null,
  chiTietHoaDons: [],
};

export const fetchCaLam = createAsyncThunk('caLam/fetchCaLam', async (id_nhaHang: string) => {
  //const caLamData = await getListCalam(id_nhanVien);
  const caLams = await getListCaLam(id_nhaHang);
  return caLams;
});

export const moCaLam = createAsyncThunk('caLam/moCaLam', async (caLam: CaLam, thunkAPI) => {
  try {
    const data = await moCaLamViec(caLam);
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới:', error);
      return thunkAPI.rejectWithValue(error.message || 'Lỗi khi mở ca làm');
  }
})

export const fetchChiTietHoaDonTheoCaLam = createAsyncThunk('caLam/fetchChiTietHoaDon', async (id_caLamViec: string, thunkAPI) => {
  try {
    const data = await getListChiTietHoaDonTheoCaLam(id_caLamViec);
    return data;
  } catch (error: any) {
    console.log('Lỗi lấy danh sách:', error);
    return thunkAPI.rejectWithValue(
      error.message || 'Error fetching ChiTietHoaDon',
    );
  }
});


const caLamSlice = createSlice({
  name: 'caLam',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCaLam.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchCaLam.fulfilled,
        (state, action: PayloadAction<CaLam[]>) => {
          state.status = 'succeeded';
          state.caLams = action.payload;
        },
      )
      .addCase(fetchCaLam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchChiTietHoaDonTheoCaLam.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchChiTietHoaDonTheoCaLam.fulfilled,
        (state, action: PayloadAction<ChiTietHoaDon[]>) => {
          state.status = 'succeeded';
          state.chiTietHoaDons = action.payload;
        },
      )
      .addCase(fetchChiTietHoaDonTheoCaLam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(
        moCaLam.fulfilled,
        (state, action: PayloadAction<CaLam>) => {
          state.caLams.unshift(action.payload);
          state.status = 'succeeded';
        },
      )
      .addCase(moCaLam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Lỗi không xác định!';
      })
  },
});

export default caLamSlice.reducer;
