export default class NhanVienModel {
    _id?: string;
    hoTen: string;
    hinhAnh: string;
    soDienThoai: string;
    cccd: string;
    vaiTro: string;
    id_NhaHang: string;

    constructor(hoTen: string, hinhAnh: string, soDienThoai: string, cccd: string, vaiTro: string, id_NhaHang: string, _id?: string) {
        this.hoTen = hoTen;
        this.hinhAnh = hinhAnh;
        this.soDienThoai = soDienThoai;
        this.cccd = cccd;
        this.vaiTro = vaiTro;
        this.id_NhaHang = id_NhaHang;
        this._id = _id;
    }
}