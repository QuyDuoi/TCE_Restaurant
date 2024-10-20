import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getListNhomTopping,
  addNhomTopping,
  updateNhomTopping,
} from '../services/api';

// Interface định nghĩa cho NhomTopping
export interface NhomTopping {
  _id: string;
  tenNhomTopping: string;
}

export interface NhomToppingState {
  nhomToppings: NhomTopping[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Khởi tạo trạng thái ban đầu
const initialState: NhomToppingState = {
  nhomToppings: [],
  status: 'idle',
  error: null,
};

// Async thunk để lấy danh sách NhomTopping
export const fetchNhomTopping = createAsyncThunk(
  'nhomTopping/fetchNhomTopping',
  async () => {
    const data = await getListNhomTopping();
    return data; // Trả về dữ liệu
  },
);

// Async thunk để thêm mới NhomTopping
export const addNewNhomTopping = createAsyncThunk(
  'nhomTopping/addNhomTopping',
  async (formData: NhomTopping, thunkAPI) => {
    try {
      const data = await addNhomTopping(formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi thêm mới:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error adding NhomTopping',
      );
    }
  },
);

// Async thunk để cập nhật NhomTopping
export const updateNhomToppingThunk = createAsyncThunk(
  'nhomTopping/updateNhomTopping',
  async ({id, formData}: {id: string; formData: NhomTopping}, thunkAPI) => {
    try {
      const data = await updateNhomTopping(id, formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi cập nhật: ', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error updating NhomTopping',
      );
    }
  },
);

const nhomToppingSlice = createSlice({
  name: 'nhomTopping',
  initialState,
  reducers: {
    // Reducers tùy chỉnh nếu cần
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNhomTopping.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchNhomTopping.fulfilled,
        (state, action: PayloadAction<NhomTopping[]>) => {
          state.status = 'succeeded';
          state.nhomToppings = action.payload;
        },
      )
      .addCase(fetchNhomTopping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch NhomToppings';
      })
      .addCase(
        addNewNhomTopping.fulfilled,
        (state, action: PayloadAction<NhomTopping>) => {
          state.nhomToppings.unshift(action.payload); // Thêm NhomTopping mới vào danh sách
          state.status = 'succeeded';
        },
      )
      .addCase(addNewNhomTopping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error adding NhomTopping';
      })
      .addCase(
        updateNhomToppingThunk.fulfilled,
        (state, action: PayloadAction<NhomTopping>) => {
          const index = state.nhomToppings.findIndex(
            nt => nt._id === action.payload._id,
          );
          if (index !== -1) {
            state.nhomToppings[index] = action.payload; // Cập nhật thông tin NhomTopping
          }
          state.status = 'succeeded';
        },
      )
      .addCase(updateNhomToppingThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Error updating NhomTopping';
      });
  },
});

export default nhomToppingSlice.reducer;
