import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getListTopping, addTopping, updateTopping} from '../../services/api';

// Interface định nghĩa cho Topping
export interface Topping {
  _id: string;
  tenTopping: string;
  giaTopping: number;
  trangThai: boolean;
  id_nhomTopping: string;
}

export interface ToppingState {
  toppings: Topping[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ToppingState = {
  toppings: [],
  status: 'idle',
  error: null,
};

// Async thunk để lấy danh sách Topping
export const fetchTopping = createAsyncThunk(
  'topping/fetchTopping',
  async (id_nhomTopping: string) => {
    const data = await getListTopping(id_nhomTopping);
    return data;
  },
);

// Async thunk để thêm mới Topping
export const addNewTopping = createAsyncThunk(
  'topping/addTopping',
  async (formData: Topping, thunkAPI) => {
    try {
      const data = await addTopping(formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi thêm mới:', error);
      return thunkAPI.rejectWithValue(error.message || 'Error adding Topping');
    }
  },
);

// Async thunk để cập nhật Topping
export const updateToppingThunk = createAsyncThunk(
  'topping/updateTopping',
  async ({id, formData}: {id: string; formData: Topping}, thunkAPI) => {
    try {
      const data = await updateTopping(id, formData);
      return data;
    } catch (error: any) {
      console.log('Lỗi cập nhật:', error);
      return thunkAPI.rejectWithValue(
        error.message || 'Error updating Topping',
      );
    }
  },
);

const toppingSlice = createSlice({
  name: 'topping',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopping.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchTopping.fulfilled,
        (state, action: PayloadAction<Topping[]>) => {
          state.status = 'succeeded';
          state.toppings = action.payload;
        },
      )
      .addCase(fetchTopping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch toppings';
      })
      .addCase(
        addNewTopping.fulfilled,
        (state, action: PayloadAction<Topping>) => {
          state.toppings.unshift(action.payload);
          state.status = 'succeeded';
        },
      )
      .addCase(addNewTopping.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error adding topping';
      })
      .addCase(
        updateToppingThunk.fulfilled,
        (state, action: PayloadAction<Topping>) => {
          const index = state.toppings.findIndex(
            t => t._id === action.payload._id,
          );
          if (index !== -1) {
            state.toppings[index] = action.payload;
          }
          state.status = 'succeeded';
        },
      )
      .addCase(updateToppingThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Error updating topping';
      });
  },
});

export default toppingSlice.reducer;
