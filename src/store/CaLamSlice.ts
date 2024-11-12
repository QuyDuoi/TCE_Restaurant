import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getListCaLam, getListChiTietHoaDonTheoCaLam, getListNhanVien } from '../services/api';
import { NhanVienSlice } from './NhanVienSlice';
import { ChiTietHoaDon } from './ChiTietHoaDonSlice';

export interface CaLam {
  _id?: string;
  batDau: Date;
  ketThuc?: Date;
  soDuBanDau: number;
  soDuHienTai: number;
  tongTienMat: number;
  tongChuyenKhoan: number;
  tongDoanhThu: number;
  tongThu: number;
  tongChi: number;
  id_nhanVien: NhanVienSlice;
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

export const fetchCaLam = createAsyncThunk('caLam/fetchCaLam', async () => {
  //const caLamData = await getListCalam(id_nhanVien);
  const nhanViens = await getListNhanVien();
  const allCaLamResponse = await Promise.all(
    nhanViens.map(nv => {
      return getListCaLam(nv._id as string);
    }),
  );
  const allCaLams = allCaLamResponse.flatMap((response: any, index: number) => {
    return response.map((caLam: CaLam) => {
      return {
        ...caLam,
        id_nhanVien: nhanViens[index],
      };
    });
  });
  return allCaLams;
});

export const fetchChiTietHoaDonTheoCaLam = createAsyncThunk('caLam/fetchChiTietHoaDon', async (id_caLam: string, thunkAPI) => {
  try {
    const data = await getListChiTietHoaDonTheoCaLam(id_caLam);
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
      });
  },
});

export default caLamSlice.reducer;
