export default class MonAn {
    _id?: string;
    tenMonAn: string;
    anhMonAn: string;
    moTa: string;
    giaMonAn: number;
    trangThai: boolean;
    id_DanhMuc: string;
    id_NhomTopping: string;

    constructor(tenMonAn: string, anhMonAn: string, moTa: string, giaMonAn: number, trangThai: boolean, id_DanhMuc: string, id_NhomTopping: string, _id?: string) {
        this.tenMonAn = tenMonAn;
        this.anhMonAn = anhMonAn;
        this.moTa = moTa;
        this.giaMonAn = giaMonAn;
        this.trangThai = trangThai;
        this.id_DanhMuc = id_DanhMuc;
        this.id_NhomTopping = id_NhomTopping;
        this._id = _id;
    }
}