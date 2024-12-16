export default class HoaDon {
  _id?: string;
  tongGiaTri: number;
  trangThai: string;
  id_nhanVien: string;
  hinhThucThanhToan: boolean;
  tienGiamGia?: number;
  ghiChu?: string;
  id_ban?: string;
  thoiGianVao?: Date;
  thoiGianRa?: Date;
  id_caLamViec?: string;
  nhanVienTao?: string;
  nhanVienThanhToan?: string;

  constructor(
    tongGiaTri: number,
    trangThai: string,
    id_nhanVien: string,
    hinhThucThanhToan: boolean,
    tienGiamGia?: number,
    ghiChu?: string,
    id_ban?: string,
    thoiGianVao?: Date,
    thoiGianRa?: Date,
    id_caLamViec?: string,
    _id?: string,
    nhanVienTao?: string,
    nhanVienThanhToan?: string,
  ) {
    (this.tongGiaTri = tongGiaTri),
      (this.trangThai = trangThai),
      (this.id_nhanVien = id_nhanVien),
      (this.hinhThucThanhToan = hinhThucThanhToan),
      (this.tienGiamGia = tienGiamGia);
    this.ghiChu = ghiChu;
    this.id_ban = id_ban;
    this.thoiGianVao = thoiGianVao;
    this.thoiGianRa = thoiGianRa;
    this.id_caLamViec = id_caLamViec;
    this._id = _id;
    this.nhanVienTao = nhanVienTao;
    this.nhanVienThanhToan = nhanVienThanhToan;
  }
}
