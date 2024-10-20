export default class DanhMuc {
  _id: string;
  tenDanhMuc: string;
  id_NhaHang: string;

  constructor(tenDanhMuc: string, id_NhaHang: string, _id: string) {
    this.tenDanhMuc = tenDanhMuc;
    this.id_NhaHang = id_NhaHang;
    this._id = _id;
  }
}
