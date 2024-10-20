import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListDanhMuc,
  addDanhMuc,
  updateDanhMuc,
  deleteDanhMuc,
} from '../services/api'; // Đường dẫn tới API tương ứng
import MonAn from '../services/models/MonAnModel';

// Định nghĩa interface cho DanhMuc
export interface DanhMuc {
  _id: string;
  tenDanhMuc: string;
  id_NhaHang: string;
  quantityCurrent: number;
  totalFood: number;
  monAn: MonAn[];
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

export const addNewDanhMuc = createAsyncThunk(
  'danhMucs/addDanhMuc',
  async (formData: DanhMuc, thunkAPI) => {
    try {
      const data = await addDanhMuc(formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi thêm mới:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error adding DanhMuc');
    }
  },
);

export const updateDanhMucThunk = createAsyncThunk(
  'danhMucs/updateDanhMuc',
  async ({id, formData}: {id: string; formData: DanhMuc}, thunkAPI) => {
    try {
      const data = await updateDanhMuc(id, formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi cập nhật:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error updating DanhMuc',
      );
    }
  },
);
export const deleteDanhMucThunk = createAsyncThunk(
  'danhMucs/deleteDanhMuc',
  async (id: string, thunkAPI) => {
    try {
      await deleteDanhMuc(id);
      return id;
    } catch (error: any) {
      console.log('Lỗi xóa:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error deleting DanhMuc',
      );
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
        state.error = action.error.message || 'Could not fetch danh mục'; // Lỗi khi fetch thất bại
      })
      .addCase(addNewDanhMuc.fulfilled, (state, action: PayloadAction<any>) => {
        state.danhMucs.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addNewDanhMuc.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error adding DanhMuc';
      })
      .addCase(
        updateDanhMucThunk.fulfilled,
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
      .addCase(updateDanhMucThunk.rejected, (state, action) => {
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
