// slices/MonAnSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getListMonAn, addMonAn, updateMonAn } from '../services/api'; // Đường dẫn tới API tương ứng
import { updateHoaDonThunk } from './HoaDonSlice';

// Định nghĩa interface cho MonAn
export interface MonAn {
    _id?: string;
    tenMonAn: string;
    anhMonAn: string;
    moTa: string;
    giaMonAn: number;
    trangThai: boolean;
    id_DanhMuc: string;
    id_NhomTopping: string;
}

// Định nghĩa state cho MonAn
export interface MonAnState {
    monAns: MonAn[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Trạng thái ban đầu cho MonAnSlice
const initialState: MonAnState = {
    monAns: [],
    status: 'idle',
    error: null,
};

// Thunk để fetch danh sách món ăn
export const fetchMonAns = createAsyncThunk('monAns/fetchMonAns', async () => {
    const data = await getListMonAn(); // Gọi API để lấy danh sách món ăn
    return data; // Trả về dữ liệu
});

export const addNewMonAn = createAsyncThunk('monAns/addMonAn', async (formData: MonAn, thunkAPI) => {
    try {
        const data = await addMonAn(formData);
        return data;
    } catch (error: any) {
        console.log('Lỗi thêm mới:', error);
        return thunkAPI.rejectWithValue(error.message || 'Error adding MonAn');
    }
});

export const updateMonAnThunk = createAsyncThunk(
    'chiTietHoaDon/updateChiTietHoaDon',
    async ({ id, formData }: { id: string, formData: MonAn }, thunkAPI) => {
        try {
            const data = await updateMonAn(id, formData);
            return data;
        } catch (error: any) {
            console.log('Lỗi cập nhật:', error);
            return thunkAPI.rejectWithValue(error.message || 'Error updating MonAn');
        }
    }
);

// Tạo MonAnSlice
const monAnSlice = createSlice({
    name: 'monAns',
    initialState,
    reducers: {
        // Các reducers tùy chỉnh (nếu cần)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMonAns.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMonAns.fulfilled, (state, action: PayloadAction<MonAn[]>) => {
                state.status = 'succeeded';
                state.monAns = action.payload; // Cập nhật danh sách món ăn khi fetch thành công
            })
            .addCase(fetchMonAns.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Could not fetch món ăn'; // Lỗi khi fetch thất bại
            })
            .addCase(addNewMonAn.fulfilled, (state, action: PayloadAction<MonAn>) => {
                state.monAns.unshift(action.payload);
                state.status = 'succeeded';
            })
            .addCase(addNewMonAn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error adding MonAn';
            })
            .addCase(updateMonAnThunk.fulfilled, (state, action: PayloadAction<MonAn>) => {
                const index = state.monAns.findIndex(cthd => cthd._id === action.payload._id);
                if (index !== -1) {
                    state.monAns[index] = action.payload;
                }
                state.status = 'succeeded';
            })
            .addCase(updateHoaDonThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Error updating MonAn';
            });
    },
});

// Export reducer để sử dụng trong store
export default monAnSlice.reducer;
