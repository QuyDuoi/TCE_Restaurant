import {KhuVuc} from '../../store/KhuVucSlice';

export default class Ban {
  _id?: string;
  tenBan: string;
  sucChua: number;
  trangThai: string;
  ghiChu: string;
  id_khuVuc: KhuVuc;

  constructor(
    tenBan: string,
    sucChua: number,
    trangThai: string,
    ghiChu: string,
    id_khuVuc: KhuVuc,
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
