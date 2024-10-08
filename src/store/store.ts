import { configureStore } from '@reduxjs/toolkit';
import hoaDonReducer from './HoaDonSlice';
import chiTietHoaDonReducer from './ChiTietHoaDonSlice';
import toppingReducer from './ToppingSlice';
import nhomToppingReducer from './NhomToppingSlice';
import danhMucReducer from './DanhMucSlice';
import monAnReducer from './MonAnSlice';
import nhanVienReducer from './NhanVienSlice';
import khuVucReducer from './KhuVucSlice';
import banReducer from './BanSlice';


export const store = configureStore({
    reducer: {
        hoaDons: hoaDonReducer,
        chiTietHoaDons: chiTietHoaDonReducer,
        nhomToppings: nhomToppingReducer,
        toppings: toppingReducer,
        danhMuc: danhMucReducer,
        monAn: monAnReducer,
        nhanVien: nhanVienReducer,
        khuVuc: khuVucReducer,
        ban: banReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
