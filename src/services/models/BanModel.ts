import {KhuVuc} from '../../store/KhuVucSlice';

export default class Ban {
  _id?: string;
  tenBan: string;
  sucChua: number;
  trangThai: string;
  ghiChu: string;
  id_KhuVuc: string;

  constructor(
    tenBan: string,
    sucChua: number,
    trangThai: string,
    ghiChu: string,
    id_KhuVuc: string,
    _id?: string,
  ) {
    this.tenBan = tenBan;
    this.sucChua = sucChua;
    this.trangThai = trangThai;
    this.ghiChu = ghiChu;
    this.id_KhuVuc = id_KhuVuc;
    this._id = _id;
  }
}
