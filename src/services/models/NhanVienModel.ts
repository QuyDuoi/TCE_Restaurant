export default class NhanVienModel {
    _id?: string;
    hoTen: string;
    hinhAnh: string;
    soDienThoai: string;
    cccd: string;
    vaiTro: string;
    trangThai: boolean;
    id_nhaHang: string;

    constructor(hoTen: string, hinhAnh: string, soDienThoai: string, cccd: string, vaiTro: string, trangThai: boolean, id_nhaHang: string, _id?: string) {
        this.hoTen = hoTen;
        this.hinhAnh = hinhAnh;
        this.soDienThoai = soDienThoai;
        this.cccd = cccd;
        this.vaiTro = vaiTro;
        this.trangThai = trangThai;
        this.id_nhaHang = id_nhaHang;
        this._id = _id;
    }
}