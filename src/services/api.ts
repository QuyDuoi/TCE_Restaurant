export const IPV4 = '192.168.1.20'; // Địa chỉ IP giả định của server

// export const IPV4 = '192.168.100.234';  // Địa chỉ IP giả định của server

export const ipAddress = `http://${IPV4}:3000/api/`; // Địa chỉ cơ sở API

import NhomTopping from './models/NhomToppingModel';
import Topping from './models/ToppingModel';
import HoaDon from './models/HoaDonModel';
import ChiTietHoaDon from './models/ChiTietHoaDonModel';
import Ban from './models/BanModel';
import DanhMuc from './models/DanhMucModel';
import KhuVuc from './models/KhuVucModel';
import MonAn from './models/MonAnModel';
import NhanVien from './models/NhanVienModel';
import CaLam from './models/CaLamModel';
import { NhanVienSlice } from '../store/NhanVienSlice';

// Lấy danh sách NhomTopping
export const getListNhomTopping = async (): Promise<NhomTopping[]> => {
  try {
    const response = await fetch(`${ipAddress}layDsNhomTopping`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Nhóm Topping');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Nhóm Topping: ', error);
    return [];
  }
};

// Thêm mới NhomTopping
export const addNhomTopping = async (
  formData: NhomTopping,
): Promise<NhomTopping> => {
  try {
    const response = await fetch(`${ipAddress}themNhomTopping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới Nhóm Topping');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới Nhóm Topping: ', error);
    throw error;
  }
};

// Cập nhật NhomTopping
export const updateNhomTopping = async (
  id: string,
  formData: NhomTopping,
): Promise<NhomTopping> => {
  try {
    const response = await fetch(`${ipAddress}capNhatNhomTopping/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật Nhóm Topping');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật Nhóm Topping: ', error);
    throw error;
  }
};

// Lấy danh sách Topping
export const getListTopping = async (
  id_nhomTopping: string,
): Promise<Topping[]> => {
  try {
    const response = await fetch(
      `${ipAddress}layDsTopping?id_nhomTopping=${id_nhomTopping}`,
    );
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Topping');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Topping: ', error);
    return [];
  }
};

// Thêm mới Topping
export const addTopping = async (formData: Topping): Promise<Topping> => {
  try {
    const response = await fetch(`${ipAddress}themTopping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới Topping');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới Topping: ', error);
    throw error;
  }
};

// Cập nhật Topping
export const updateTopping = async (
  id: string,
  formData: Topping,
): Promise<Topping> => {
  try {
    const response = await fetch(`${ipAddress}capNhatTopping/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật Topping');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật Topping: ', error);
    throw error;
  }
};

// Lấy danh sách HoaDon
export const getListHoaDon = async (): Promise<HoaDon[]> => {
  try {
    const response = await fetch(`${ipAddress}layDsHoaDon`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Hóa Đơn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Hóa Đơn: ', error);
    return [];
  }
};

// Thêm mới HoaDon
export const addHoaDon = async (formData: HoaDon): Promise<HoaDon> => {
  try {
    const response = await fetch(`${ipAddress}addHoaDon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới Hóa Đơn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới Hóa Đơn: ', error);
    throw error;
  }
};

// Cập nhật HoaDon
export const updateHoaDon = async (
  id: string,
  formData: HoaDon,
): Promise<HoaDon> => {
  try {
    const response = await fetch(`${ipAddress}updateHoaDon/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật Hóa Đơn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật Hóa Đơn: ', error);
    throw error;
  }
};

// Lấy danh sách ChiTietHoaDon
export const getListChiTietHoaDon = async (): Promise<ChiTietHoaDon[]> => {
  try {
    const response = await fetch(`${ipAddress}getListChiTietHoaDon`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Chi Tiết Hóa Đơn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Chi Tiết Hóa Đơn: ', error);
    return [];
  }
};

// Thêm mới ChiTietHoaDon
export const addChiTietHoaDon = async (
  formData: ChiTietHoaDon,
): Promise<ChiTietHoaDon> => {
  try {
    const response = await fetch(`${ipAddress}addChiTietHoaDon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới Chi Tiết Hóa Đơn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới Chi Tiết Hóa Đơn: ', error);
    throw error;
  }
};

// Cập nhật ChiTietHoaDon
export const updateChiTietHoaDon = async (
  id: string,
  formData: ChiTietHoaDon,
): Promise<ChiTietHoaDon> => {
  try {
    const response = await fetch(`${ipAddress}updateChiTietHoaDon/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật Chi Tiết Hóa Đơn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật Chi Tiết Hóa Đơn: ', error);
    throw error;
  }
};

// Lấy danh sách Ban
export const getListBan = async (idKhuVuc: string): Promise<Ban[]> => {
  try {
    const response = await fetch(`${ipAddress}layDsBan?id_khuVuc=${idKhuVuc}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Bàn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Bàn: ', error);
    return [];
  }
};

// Thêm mới Bàn
export const addBan = async (formData: Ban): Promise<Ban> => {
  try {
    const response = await fetch(`${ipAddress}addBan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới Bàn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới Bàn: ', error);
    throw error;
  }
};

// Cập nhật Bàn
export const updateBan = async (id: string, formData: Ban): Promise<Ban> => {
  try {
    const response = await fetch(`${ipAddress}capNhatBan/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật Bàn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật bàn: ', error);
    throw error;
  }
};

export const getListDanhMuc = async (
  id_nhaHang: string,
): Promise<DanhMuc[]> => {
  try {
    const response = await fetch(
      `${ipAddress}layDsDanhMuc?id_nhaHang=${id_nhaHang}`,
    );
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Danh mục');
    }
    const data = await response.json();
    console.log('Lấy danh mục thành công');
    //console.log(data);
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách danh mục: ', error);
    return [];
  }
};

export const addDanhMuc = async (formData: DanhMuc): Promise<DanhMuc> => {
  try {
    const response = await fetch(`${ipAddress}themDanhMuc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới danh mục');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới danh mục: ', error);
    throw error;
  }
};

export const updateDanhMuc = async (
  id: string,
  formData: DanhMuc,
): Promise<DanhMuc> => {
  try {
    const response = await fetch(`${ipAddress}capNhatDanhMuc/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật danh mục');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật danh mục: ', error);
    throw error;
  }
};
export const deleteDanhMuc = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${ipAddress}xoaDanhMuc/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Lỗi khi xóa danh mục');
    }
    console.log(`Danh mục với ID ${id} đã được xóa thành công.`);
  } catch (error) {
    console.log('Lỗi khi xóa danh mục: ', error);
    throw error;
  }
};

/**
 *  API cho Khu Vực
 */

export const getListKhuVuc = async (idNhaHang: string): Promise<KhuVuc[]> => {
  try {
    const response = await fetch(
      `${ipAddress}layDsKhuVuc?id_nhaHang=${idNhaHang}`,
    );
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Khu Vực');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách khu vực: ', error);
    return [];
  }
};

export const addKhuVuc = async (formData: KhuVuc): Promise<KhuVuc> => {
  try {
    const response = await fetch(`${ipAddress}addKhuVuc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới Khu Vực');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới khu vực: ', error);
    throw error;
  }
};

export const updateKhuVuc = async (
  id: string,
  formData: KhuVuc,
): Promise<KhuVuc> => {
  try {
    const response = await fetch(`${ipAddress}updateKhuVuc/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật khu vực');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật khu vực: ', error);
    throw error;
  }
};

export const getListMonAn = async (id_danhMuc?: String): Promise<MonAn[]> => {
  let response: Response | null = null; // Khai báo biến response
  try {
    if (id_danhMuc) {
      response = await fetch(`${ipAddress}layDsMonAn?id_danhMuc=${id_danhMuc}`);
    } else {
      response = await fetch(`${ipAddress}layDsMonAn`);
    }
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Món ăn');
    }
    console.log('Lấy món ăn thành công');
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Món ăn: ', error);
    return [];
  }
};

export const addMonAn = async (formData: MonAn): Promise<MonAn> => {
  try {
    const response = await fetch(`${ipAddress}themMonAn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thêm mới Món ăn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới món ăn: ', error);
    throw error;
  }
};

export const updateMonAn = async (
  id: string,
  formData: MonAn,
): Promise<MonAn> => {
  try {
    const response = await fetch(`${ipAddress}capNhatMonAn/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật Mon Ăn');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật Mon ăn: ', error);
    throw error;
  }
};
/**
 *  API cho Nhân Viên
 */
export const getListNhanVien = async (): Promise<NhanVienSlice[]> => {
  try {
    const response = await fetch(`${ipAddress}/layDsNhanVien`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Nhan Vien');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Nhân Viên: ', error);
    return [];
  }
};

export const themNhanVien = async (formData: FormData) => {
  try {
    const response = await fetch(`${ipAddress}themNhanVien`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();  // Nhận thông báo lỗi từ backend
      throw new Error(errorData.msg || 'Lỗi không xác định');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới Nhân viên: ', error.message);
    throw error;
  }
};

export const updateNhanVien = async (
  id: string,
  formData: FormData,
) => {
  try {
    const response = await fetch(`${ipAddress}/capNhatNhanVien/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật Nhân viên');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật Nhân viên: ', error);
    throw error;
  }
};

export const deleteNhanVien = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${ipAddress}xoaNhanVien/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Lỗi khi xóa nhân viên');
    }

    console.log('Xóa nhân viên thành công');
  } catch (error) {
    console.log('Lỗi khi xóa nhân viên: ', error);
    throw new Error('Lỗi khi xóa nhân viên');
  }
};

export const getListCaLam = async (id_nhanVien: string): Promise<CaLam[]> => {
  try {
    const response = await fetch(
      `${ipAddress}layDsCaLamViec?id_nhanVien=${id_nhanVien}`,
    );
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Ca Lam');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Ca Lam: ', error);
    return [];
  }
};
