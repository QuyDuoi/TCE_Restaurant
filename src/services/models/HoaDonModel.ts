export default class HoaDon {
    _id?: string;
    tongGiaTri: number;
    trangThai: string;
    tienGiamGia?: number;
    ghiChu?: string;
    id_nhanVien?: string;
    id_ban?: string;
    id_chiTietHoaDon?: string;

    constructor(
        tongGiaTri: number,
        trangThai: string,
        tienGiamGia?: number,
        ghiChu?: string,
        id_nhanVien?: string,
        id_ban?: string,
        id_chiTietHoaDon?: string,
        _id?: string
    ) {
        this.tongGiaTri = tongGiaTri;
        this.trangThai = trangThai;
        this.tienGiamGia = tienGiamGia;
        this.ghiChu = ghiChu;
        this.id_nhanVien = id_nhanVien;
        this.id_ban = id_ban;
        this.id_chiTietHoaDon = id_chiTietHoaDon;
        this._id = _id;
    }
}
