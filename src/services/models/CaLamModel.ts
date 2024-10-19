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
  id_nhanVien: string;

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
    id_nhanVien: string,
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
    this._id = _id;
  }
}
