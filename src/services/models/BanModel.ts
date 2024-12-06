
export default class Ban {
  _id?: string;
  tenBan: string;
  sucChua: number;
  trangThai?: string;
  ghiChu?: string;
  id_khuVuc: string;

  constructor(
    tenBan: string,
    sucChua: number,
    trangThai: string,
    ghiChu: string,
    id_khuVuc: string,
    _id?: string,
  ) {
    this.tenBan = tenBan;
    this.sucChua = sucChua;
    this.trangThai = trangThai;
    this.ghiChu = ghiChu;
    this.id_khuVuc = id_khuVuc;
    this._id = _id;
  }
}
