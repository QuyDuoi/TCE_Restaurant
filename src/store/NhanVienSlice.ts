// slices/NhanVienSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { addNhanVien, getListNhanVien, updateNhanVien } from '../services/api'; // Đường dẫn tới API tương ứng
import { vaiTroNhanVien } from '../enum/enum';

// Định nghĩa interface cho NhanVien
export interface NhanVien {
    _id: string;    
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
    nhanViens: NhanVien[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Trạng thái ban đầu cho NhanVienSlice
const initialState: NhanVienState = {
    nhanViens: [],
    status: 'idle',
    error: null,
};

// Thunk để fetch danh sách nhân viên
export const fetchNhanViens = createAsyncThunk('nhanViens/fetchNhanViens', async () => {
    const data = await getListNhanVien(); // Gọi API để lấy danh sách nhân viên
    return data; // Trả về dữ liệu
});

export const addNewNhanVien = createAsyncThunk('nhanViens/addNhanVien', async (formData: NhanVien, thunkAPI) => {
    try {
        const data = await addNhanVien(formData);
        return data;
    } catch (error: any) {
        console.log('Lỗi thêm mới:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error adding NhanVien');
    }
});

export const updateNhanVienThunk = createAsyncThunk(
    'nhanViens/updateNhanVien',
    async ({ id, formData }: { id: string, formData: NhanVien }, thunkAPI) => {
        try {
            const data = await updateNhanVien(id, formData);
            return data;
        } catch (error: any) {
            console.log('Lỗi cập nhật:', error);
            return thunkAPI.rejectWithValue(error.message || 'Error updating NhanVien');
        }
    }
);

// Tạo NhanVienSlice
const nhanVienSlice = createSlice({
    name: 'nhanViens',
    initialState,
    reducers: {
        // Các reducers tùy chỉnh (nếu cần)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNhanViens.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNhanViens.fulfilled, (state, action: PayloadAction<NhanVien[]>) => {
                state.status = 'succeeded';
                state.nhanViens = action.payload; // Cập nhật danh sách nhân viên khi fetch thành công
            })
            .addCase(fetchNhanViens.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Could not fetch nhân viên'; // Lỗi khi fetch thất bại
            })
            .addCase(addNewNhanVien.fulfilled, (state, action: PayloadAction<NhanVien>) => {
                state.nhanViens.unshift(action.payload);
                state.status = 'succeeded';
            })
            .addCase(addNewNhanVien.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error adding NhanVien';
            })
            .addCase(updateNhanVienThunk.fulfilled, (state, action: PayloadAction<NhanVien>) => {
                const index = state.nhanViens.findIndex(cthd => cthd._id === action.payload._id);
                if (index !== -1) {
                    state.nhanViens[index] = action.payload;
                }
                state.status = 'succeeded';
            })
            .addCase(updateNhanVienThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error updating NhanVien';
            });
    },
});

// Export reducer để sử dụng trong store
export default nhanVienSlice.reducer;
