export default class MonAn {
  _id: string;
  tenMon: string;
  anhMonAn: string;
  moTa: string;
  giaMonAn: number;
  trangThai: boolean;
  id_danhMuc: string;
  id_nhomTopping: string;

  constructor(
    tenMon: string,
    anhMonAn: string,
    moTa: string,
    giaMonAn: number,
    trangThai: boolean,
    image: string,
    id_danhMuc: string,
    id_nhomTopping: string,
    _id: string,
  ) {
    this.tenMon = tenMon;
    this.anhMonAn = anhMonAn;
    this.moTa = moTa;
    this.giaMonAn = giaMonAn;
    this.trangThai = trangThai;
    this.id_danhMuc = id_danhMuc;
    this.id_nhomTopping = id_nhomTopping;
    this._id = _id;
  }
}
