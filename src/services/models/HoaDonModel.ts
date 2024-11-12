export default class HoaDon {
  _id?: string;
  tongGiaTri: number;
  trangThai: string;
  id_nhanVien: string;
  id_chiTietHoaDon: string[];
  hinhThucThanhToan: boolean;
  tienGiamGia?: number;
  ghiChu?: string;
  id_ban?: string;
  thoiGianVaoBan?: Date;
  thoiGianRaBan?: Date;

  constructor(
    tongGiaTri: number,
    trangThai: string,
    id_nhanVien: string,
    id_chiTietHoaDon: string[],
    hinhThucThanhToan: boolean,
    tienGiamGia?: number,
    ghiChu?: string,
    id_ban?: string,
    thoiGianVaoBan?: Date,
    thoiGianRaBan?: Date,
    _id?: string,
  ) {
    (this.tongGiaTri = tongGiaTri),
      (this.trangThai = trangThai),
      (this.id_nhanVien = id_nhanVien),
      (this.id_chiTietHoaDon = id_chiTietHoaDon),
      (this.hinhThucThanhToan = hinhThucThanhToan),
      (this.tienGiamGia = tienGiamGia);
    this.ghiChu = ghiChu;
    this.id_ban = id_ban;
    this.thoiGianVaoBan = thoiGianVaoBan;
    this.thoiGianRaBan = thoiGianRaBan;
    this._id = _id;
  }
}
