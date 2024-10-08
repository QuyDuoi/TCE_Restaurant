export default class KhuVuc {
    _id?: string;
    tenKhuVuc: string;
    id_NhaHang: string;

    constructor(tenKhuVuc: string, id_NhaHang: string, _id?: string) {
        this.tenKhuVuc = tenKhuVuc;
        this.id_NhaHang = id_NhaHang;
        this._id = _id;
    }
}