import MonAn from './MonAnModel';

export default class ChiTietHoaDon {
  _id?: string;
  soLuongMon: number;
  giaTien: number;
  trangThai: boolean;
  id_monAn: MonAn;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    soLuongMon: number,
    giaTien: number,
    trangThai: boolean,
    id_monAn: MonAn,
    _id?: string,
  ) {
    this.soLuongMon = soLuongMon;
    this.giaTien = giaTien;
    this.trangThai = true;
    this.id_monAn = id_monAn;
    this._id = _id;
  }
}
