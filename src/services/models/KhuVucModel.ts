export default class KhuVuc {
    _id?: string;
    tenKhuVuc: string;
    id_nhaHang?: string;

    constructor(tenKhuVuc: string, id_nhaHang: string, _id?: string) {
        this.tenKhuVuc = tenKhuVuc;
        this.id_nhaHang = id_nhaHang;
        this._id = _id;
    }
}