import {configureStore} from '@reduxjs/toolkit';
import hoaDonReducer from './Slices/HoaDonSlice';
import chiTietHoaDonReducer from './Slices/ChiTietHoaDonSlice';
import toppingReducer from './Slices/ToppingSlice';
import nhomToppingReducer from './Slices/NhomToppingSlice';
import danhMucReducer from './Slices/DanhMucSlice';
import monAnReducer from './Slices/MonAnSlice';
import nhanVienReducer from './Slices/NhanVienSlice';
import khuVucReducer from './Slices/KhuVucSlice';
import banReducer from './Slices/BanSlice';
import caLamReducer from './Slices/CaLamSlice';
import chiTietMonReducer from './Slices/ChiTietMonSlice';
import userReducer from './Slices/UserSlice';
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
    caLam: caLamReducer,
    chiTietMon: chiTietMonReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
