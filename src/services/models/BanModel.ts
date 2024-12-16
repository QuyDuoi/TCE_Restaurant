export default class Ban {
  _id?: string;
  tenBan: string;
  sucChua: string;
  trangThai?: string;
  ghiChu?: string;
  id_khuVuc: string;
  matKhau?: number;
  trangThaiOrder?: boolean;
  danhSachOrder?: any[];

  constructor(
    tenBan: string,
    sucChua: string,
    trangThai: string,
    ghiChu: string,
    id_khuVuc: string,
    matKhau?: number,
    trangThaiOrder?: boolean,
    danhSachOrder?: any[],
    _id?: string,
  ) {
    this.tenBan = tenBan;
    this.sucChua = sucChua;
    this.trangThai = trangThai;
    this.ghiChu = ghiChu;
    this.id_khuVuc = id_khuVuc;
    (this.trangThaiOrder = trangThaiOrder),
      (this.danhSachOrder = danhSachOrder),
      (this.matKhau = matKhau);
    this._id = _id;
  }
}
