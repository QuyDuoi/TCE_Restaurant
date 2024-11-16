import {HoaDon} from '../../store/HoaDonSlice';
import {NhanVienSlice} from '../../store/NhanVienSlice';

export default class CaLam {
  _id?: string;
  batDau: Date;
  ketThuc?: Date;
  soDuBanDau: number;
  soDuHienTai: number;
  tongTienMat: number;
  tongChuyenKhoan: number;
  tongDoanhThu: number;
  tongThu: number;
  tongChi: number;
  id_nhanVien: NhanVienSlice;
  id_nhaHang: string;
  constructor(
    batDau: Date,
    ketThuc: Date,
    soDuBanDau: number,
    soDuHienTai: number,
    tongTienMat: number,
    tongChuyenKhoan: number,
    tongDoanhThu: number,
    tongThu: number,
    tongChi: number,
    id_nhanVien: NhanVienSlice,

    id_nhaHang: string,
    _id?: string,
  ) {
    this.batDau = batDau;
    this.ketThuc = ketThuc;
    this.soDuBanDau = soDuBanDau;
    this.soDuHienTai = soDuHienTai;
    this.tongTienMat = tongTienMat;
    this.tongChuyenKhoan = tongChuyenKhoan;
    this.tongDoanhThu = tongDoanhThu;
    this.tongThu = tongThu;
    this.tongChi = tongChi;
    this.id_nhanVien = id_nhanVien;
    this.id_nhaHang = id_nhaHang;
    this._id = _id;
  }
}
