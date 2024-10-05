import { configureStore } from '@reduxjs/toolkit';
import hoaDonReducer from './HoaDonSlice';
import chiTietHoaDonReducer from './ChiTietHoaDonSlice';
import toppingReducer from './ToppingSlice';
import nhomToppingReducer from './NhomToppingSlice';

export const store = configureStore({
    reducer: {
        hoaDons: hoaDonReducer,
        chiTietHoaDons: chiTietHoaDonReducer,
        nhomToppings: nhomToppingReducer,
        toppings: toppingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
