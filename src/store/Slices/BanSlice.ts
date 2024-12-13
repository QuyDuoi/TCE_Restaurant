// slices/BanSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import KhuVuc from '../../services/models/KhuVucModel';
import {
  themBanThunk,
  fetchBanTheoId,
  capNhatBanThunk,
} from '../Thunks/banThunks';

// Định nghĩa interface cho Ban
export interface Ban {
  _id?: string;
  tenBan: string;
  sucChua: number;
  trangThai?: string;
  ghiChu: string;
  maQRCode?: string;
  id_khuVuc: KhuVuc;
}

// Định nghĩa state cho Ban
export interface BanState {
  bans: Ban[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  ban: Ban | null;
}

// Trạng thái ban đầu cho BanSlice
const initialState: BanState = {
  bans: [],
  status: 'idle',
  error: null,
  ban: null,
};

// Tạo BanSlice
const banSlice = createSlice({
  name: 'bans',
  initialState,
  reducers: {
    setBans: (state, action: PayloadAction<Ban[]>) => {
      state.bans = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(themBanThunk.fulfilled, (state, action: PayloadAction<Ban>) => {
        state.bans.unshift(action.payload.ban);
        state.status = 'succeeded';
      })
      .addCase(themBanThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error adding Bàn';
      })
      .addCase(capNhatBanThunk.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        capNhatBanThunk.fulfilled,
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
      .addCase(capNhatBanThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error updating Bàn';
      })
      .addCase(fetchBanTheoId.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchBanTheoId.fulfilled,
        (state, action: PayloadAction<Ban>) => {
          // console.log("Dữ liệu trả về từ API:", action.payload);  // Kiểm tra lại dữ liệu
          console.log('name: ' + action.payload.tenBan);
          state.status = 'succeeded';
          state.ban = action.payload; // action.payload là đối tượng món ăn
        },
      );
  },
});

// Export reducer để sử dụng trong store
export const {setBans} = banSlice.actions;
export default banSlice.reducer;
