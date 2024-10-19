export interface NhanVienModel {
  id: string;
  ten: string;
  vaiTro: string;
}

export interface CaLamModel {
  id: string;
  startTime: Date;
  endTime?: Date;
  idNhanVien: string;
  soDuBanDau: number;
  soDuHienTai: number;
  tongTienMat: number;
  tongTienChuyenKhoan: number;
  tongDoanhThu: number;
}

export interface HoaDonModel {
  id: string;
  tongGiaTri: number;
  trangThai: string;
  idNhanVien: string;
  idBan?: string;
  timeVaoBan?: Date;
  timeRoiBan?: Date;
  idCaLam: string;
  phuongThucThanhToan: string;
}

export interface KhuVucModelTest {
  id: string;
  name: string;
}

export interface BanModelTest {
  id: string;
  name: string;
  capacity: number;
  status: string;
  ghiChu: string;
  idKhuVuc: string;
}
