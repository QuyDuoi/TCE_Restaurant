import MonAn from './MonAnModel';

export default class ChiTietHoaDon {
  _id?: string;
  soLuongMon: number;
  giaTien: number;
  id_monAn: MonAn;

  constructor(
    soLuongMon: number,
    giaTien: number,
    id_monAn: MonAn,
    _id?: string,
  ) {
    this.soLuongMon = soLuongMon;
    this.giaTien = giaTien;
    this.id_monAn = id_monAn;
    this._id = _id;
  }
}
