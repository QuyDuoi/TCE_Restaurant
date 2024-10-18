import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getListCalam, getListNhanVien} from '../services/api';

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
  id_nhanVien: string;
}

export interface CaLamState {
  caLams: CaLam[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

const initialState: CaLamState = {
  caLams: [],
  status: 'idle',
  error: null,
};

export const fetchCaLam = createAsyncThunk('caLam/fetchCaLam', async () => {
  //const caLamData = await getListCalam(id_nhanVien);
  const nhanViens = await getListNhanVien();
  const allCaLamResponse = await Promise.all(
    nhanViens.map(nv => {
      return getListCalam(nv._id as string);
    }),
  );
  const allCaLams = allCaLamResponse.flatMap((response, index) => {
    return response.map((caLam: CaLam) => {
      return {
        ...caLam,
        nv: nhanViens[index],
      };
    });
  });
  return allCaLams;
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
      });
  },
});

export default caLamSlice.reducer;
