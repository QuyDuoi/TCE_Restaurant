export default class Topping {
    _id?: string;
    tenTopping: string;
    giaTopping: number;
    trangThai: boolean;
    id_nhomTopping: string;

    constructor(
        tenTopping: string,
        giaTopping: number,
        trangThai: boolean,
        id_nhomTopping: string,
        _id?: string
    ) {
        this.tenTopping = tenTopping;
        this.giaTopping = giaTopping;
        this.trangThai = trangThai;
        this.id_nhomTopping = id_nhomTopping;
        this._id = _id;
    }
}
