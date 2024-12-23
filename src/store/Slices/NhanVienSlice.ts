// slices/NhanVienSlice.ts
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  themNhanVien,
  deleteNhanVien,
  getListNhanVien,
  updateNhanVien,
} from '../../services/api'; // Đường dẫn tới API tương ứng

// Định nghĩa interface cho NhanVien
export interface NhanVienSlice {
  _id?: string;
  hoTen: string;
  hinhAnh: string;
  soDienThoai: string;
  cccd: string;
  vaiTro: string;
  trangThai: boolean;
  id_nhaHang?: string;
}

// Định nghĩa state cho NhanVien
export interface NhanVienState {
  nhanViens: NhanVienSlice[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  token: string | null; // Thêm thuộc tính token
  refreshToken: string | null;
  message: string | null; // Thêm thuộc tính message để hiển thị thông báo
  statusError: string | null;
}

// Trạng thái ban đầu cho NhanVienSlice
const initialState: NhanVienState = {
  nhanViens: [],
  status: 'idle',
  error: null,
  token: null, // Khởi tạo token là null
  refreshToken: null,
  message: null,
  statusError: null,
};

// Thunk để fetch danh sách nhân viên
export const fetchNhanViens = createAsyncThunk(
  'nhanViens/fetchNhanViens',
  async (id_nhaHang: string) => {
    const data = await getListNhanVien(id_nhaHang); // Gọi API để lấy danh sách nhân viên
    return data; // Trả về dữ liệu
  },
);

export const addNewNhanVien = createAsyncThunk(
  'NhanVienSlice/addNhanVien',
  async (formData: FormData, thunkAPI) => {
    try {
      const data = await themNhanVien(formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi thêm mới:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error adding NhanVien');
    }
  },
);

export const updateNhanVienThunk = createAsyncThunk<
  NhanVienSlice, // Kiểu dữ liệu trả về khi thành công
  {id: string; formData: FormData}, // Kiểu dữ liệu tham số truyền vào
  {rejectValue: {error: string; msg: string}} // Kiểu dữ liệu trả về khi thất bại
>('nhanViens/updateNhanVien', async ({id, formData}, thunkAPI) => {
  try {
    const data = await updateNhanVien(id, formData);
    console.log('Cập nhật nhân viên thành công');
    return data; // Trả về kết quả thành công
  } catch (error: any) {
    // Kiểm tra nếu lỗi có cấu trúc
    if (error.error && error.msg) {
      return thunkAPI.rejectWithValue({
        error: error.error,
        msg: error.msg,
      });
    }
    // Trả về lỗi không xác định
    return thunkAPI.rejectWithValue({
      error: 'unknown_error',
      msg: error.message || 'Lỗi không xác định',
    });
  }
});

export const deleteNhanVienThunk = createAsyncThunk(
  'nhanViens/deleteNhanVien',
  async (id: string, thunkAPI) => {
    try {
      const deletedId = await deleteNhanVien(id); // Gọi hàm API để xóa
      return deletedId; // Trả về id nhân viên đã xóa
    } catch (error: any) {
      console.log('Lỗi khi xóa:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error deleting NhanVien',
      );
    }
  },
);

// Tạo NhanVienSlice
const nhanVienSlice = createSlice({
  name: 'nhanViens',
  initialState,
  reducers: {
    // Các reducers tùy chỉnh (nếu cần)
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNhanViens.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchNhanViens.fulfilled,
        (state, action: PayloadAction<NhanVienSlice[]>) => {
          state.status = 'succeeded';
          state.nhanViens = action.payload; // Cập nhật danh sách nhân viên khi fetch thành công
        },
      )
      .addCase(fetchNhanViens.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch nhân viên'; // Lỗi khi fetch thất bại
      })
      .addCase(
        addNewNhanVien.fulfilled,
        (state, action: PayloadAction<NhanVienSlice>) => {
          state.nhanViens.unshift(action.payload);
          state.status = 'succeeded';
        },
      )
      .addCase(addNewNhanVien.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error adding NhanVien';
      })
      .addCase(
        updateNhanVienThunk.fulfilled,
        (state, action: PayloadAction<NhanVienSlice>) => {
          const index = state.nhanViens.findIndex(
            cthd => cthd._id === action.payload._id,
          );
          if (index !== -1) {
            state.nhanViens[index] = action.payload;
          }
          state.status = 'succeeded';
        },
      )
      .addCase(updateNhanVienThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error updating NhanVien';
      })
      .addCase(
        deleteNhanVienThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.nhanViens = state.nhanViens.filter(
            nv => nv._id !== action.payload,
          ); // Xóa nhân viên khỏi danh sách
          state.status = 'succeeded';
        },
      )
      // Xử lý khi xóa thất bại
      .addCase(deleteNhanVienThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error deleting NhanVien';
      });
  },
});

// Export reducer để sử dụng trong store
export default nhanVienSlice.reducer;
