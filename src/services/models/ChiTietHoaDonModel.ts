import MonAn from './MonAnModel';

export default class ChiTietHoaDon {
  _id?: string;
  soLuongMon: number;
  giaTien: number;
  trangThai: boolean;
  id_monAn: MonAn;
  createdAt?: string;
  updatedAt?: string;
  id_hoaDon: string;

  constructor(
    soLuongMon: number,
    giaTien: number,
    trangThai: boolean,
    id_monAn: MonAn,
    id_hoaDon: string,
    _id?: string,
  ) {
    this.soLuongMon = soLuongMon;
    this.giaTien = giaTien;
    this.trangThai = trangThai;
    this.id_monAn = id_monAn;
    this.id_hoaDon = id_hoaDon;
    this._id = _id;
  }
}
