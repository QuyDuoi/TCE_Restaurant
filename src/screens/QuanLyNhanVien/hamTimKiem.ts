import { NhanVien } from "../../store/Slices/NhanVienSlice";
import { FiltersModelTest } from "./NhanVienComponent";

// Hàm loại bỏ dấu tiếng Việt
export const removeVietnameseTones = (str: string): string => {
  return str
    .normalize('NFD') // Chuẩn hóa ký tự Unicode
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh
    .replace(/đ/g, 'd') // Thay 'đ' bằng 'd'
    .replace(/Đ/g, 'D'); // Thay 'Đ' bằng 'D'
};

// Hàm applyFilters để lọc danh sách nhân viên
export const applyFilters = (
  nhanVienList: NhanVien[], // Danh sách nhân viên gốc
  searchQuery: string, // Từ khóa tìm kiếm
  filters: FiltersModelTest // Các điều kiện lọc
) => {
  if (!filters) {
    console.error('Filters is undefined, using default filters.');
    filters = {
      hoatDong: false,
      ngungHoatDong: false,
      quanLy: false,
      thuNgan: false,
      phucVu: false,
      dauBep: false,
    };
  }

  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  // Loại bỏ dấu cho chuỗi tìm kiếm
  const normalizedSearchQuery = removeVietnameseTones(searchQuery.toLowerCase());

  // Lọc danh sách nhân viên dựa trên tên và điều kiện lọc
  let filteredResult = nhanVienList.filter(nv => {
    const normalizedTenNhanVien = removeVietnameseTones(nv.hoTen.toLowerCase());
    return normalizedTenNhanVien.includes(normalizedSearchQuery);
  });

  if (activeFilters.length === 0) {
    return filteredResult;
  }

  filteredResult = filteredResult.filter(nv => {
    const statusFilter =
      (!filters.hoatDong && !filters.ngungHoatDong) ||
      (filters.hoatDong && nv.trangThai) ||
      (filters.ngungHoatDong && !nv.trangThai);

    const positionFilter =
      (!filters.quanLy &&
        !filters.thuNgan &&
        !filters.phucVu) ||
      (filters.quanLy && nv.vaiTro === 'Quản lý') ||
      (filters.thuNgan && nv.vaiTro === 'Nhân viên thu ngân') ||
      (filters.phucVu && nv.vaiTro === 'Nhân viên phục vụ')
    
    return statusFilter && positionFilter;
  });

  return filteredResult;
};
