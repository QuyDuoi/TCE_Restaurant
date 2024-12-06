//export const ipAddress = `https://tce-restaurant-api.onrender.com/api/`; // Địa chỉ cơ sở API
export const ipAddress = `http://192.168.43.21:3000/api/`; // Địa chỉ cơ sở API

export const IPV4 = 'tce-restaurant-api.onrender.com'; // Địa chỉ IP giả định của server

// export const ipAddress = `http://${IPV4}:3000/api/`; // Địa chỉ cơ sở API

import NhomTopping from './models/NhomToppingModel';
import Topping from './models/ToppingModel';
import HoaDon from './models/HoaDonModel';
import ChiTietHoaDon from './models/ChiTietHoaDonModel';
import Ban from './models/BanModel';
import KhuVuc from './models/KhuVucModel';
import {NhanVienSlice} from '../store/Slices/NhanVienSlice';
import {AppDispatch} from '../store/store';
import {hoaDonSlice} from '../store/Slices/HoaDonSlice';
import {chiTietHoaDonSlice} from '../store/Slices/ChiTietHoaDonSlice';
import {CaLam} from '../store/Slices/CaLamSlice';

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
      headers: {'Content-Type': 'application/json'},
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
      headers: {'Content-Type': 'application/json'},
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
      headers: {'Content-Type': 'application/json'},
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
      headers: {'Content-Type': 'application/json'},
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
export const getListHoaDonTheoCaLam = async (
  id_caLamViec: string,
): Promise<HoaDon[]> => {
  try {
    const response = await fetch(
      `${ipAddress}layHdTheoCaLam?id_caLamViec=${id_caLamViec}  `,
    );
    if (!response.ok) {
      throw new Error('Lỗi khi lấy danh sách Hóa Đơn');
    }
    const data = await response.json();
    //console.log('tong tien', data[0].tongTien);

    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Hóa Đơn: ', error);
    return [];
  }
};

export const getListHoaDonTheoNhaHang = async (
  id_nhaHang: string,
): Promise<HoaDon[]> => {
  try {
    const response = await fetch(
      `${ipAddress}layDsHoaDonTheoNhaHang?id_nhaHang=${id_nhaHang}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy danh sách Hóa Đơn: ', error);
    return [];
  }
};

// Thêm mới HoaDon
export const addHoaDon = async (hoaDon: HoaDon): Promise<HoaDon> => {
  try {
    const response = await fetch(`${ipAddress}themHoaDonMoi`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(hoaDon),
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
    const response = await fetch(`${ipAddress}capNhatHoaDon/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
      redirect: 'follow',
    });
    // /console.log(response);
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

//Thanh Toan Hoa Don
export const thanhToanHoaDon = async (
  id_hoaDon: string,
  tienGiamGia: number,
  hinhThucThanhToan: boolean,
  thoiGianRa: Date,
): Promise<any> => {
  try {
    const response = await fetch(`${ipAddress}thanhToanHoaDon`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id_hoaDon,
        tienGiamGia,
        hinhThucThanhToan,
        thoiGianRa,
      }),
    });
    if (!response.ok) {
      throw new Error('Lỗi khi thanh toán Hóa Đơn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thanh toán Hóa Đơn: ', error);
    throw error;
  }
};

// Lấy danh sách ChiTietHoaDon
export const getListChiTietHoaDon = async (
  id_hoaDon: string,
): Promise<ChiTietHoaDon[]> => {
  try {
    const response = await fetch(`${ipAddress}layDsChiTietHoaDon`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id_hoaDon: id_hoaDon}),
      redirect: 'follow',
    });
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
      headers: {'Content-Type': 'application/json'},
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
    const response = await fetch(`${ipAddress}capNhatChiTietHoaDon/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
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
// Cập nhật trạng thái ChiTietHoaDon
export const updateStatusChiTietHoaDon = async (
  id: string,
  trangThai: boolean,
) => {
  try {
    const response = await fetch(`${ipAddress}capNhatTrangThaiCthd/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({trangThai}), // Chỉ truyền trạng thái
    });

    if (!response.ok) {
      throw new Error('Lỗi khi cập nhật trạng thái Chi Tiết Hóa Đơn');
    }

    const data: ChiTietHoaDon = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái Chi Tiết Hóa Đơn: ', error);
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
export const themBan = async (ban: Ban) => {
  try {
    const response = await fetch(`${ipAddress}themBan`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ban),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Lỗi không xác định');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới Bàn: ', error);
    throw error;
  }
};

// Cập nhật Bàn
export const capNhatBan = async (id: string, ban: Ban) => {
  try {
    const response = await fetch(`${ipAddress}capNhatBan/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(ban),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Lỗi không xác định');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi cập nhật bàn: ', error);
    throw error;
  }
};

export const getBanTheoId = async (id_Ban: String) => {
  let response: Response | null = null; // Khai báo biến response
  try {
    response = await fetch(`${ipAddress}ban/${id_Ban}`);
    if (!response.ok) {
      throw new Error('Lỗi khi lấy Bàn');
    }
    console.log('Lấy Bàn thành công');
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Lỗi khi lấy Bàn: ', error);
    return [];
  }
};

/**
 *  API cho Khu Vực
 */

export const layDsKhuVuc = async (id_nhaHang: string) => {
  try {
    const response = await fetch(
      `${ipAddress}layDsKhuVuc?id_nhaHang=${id_nhaHang}`,
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

export const themKhuVuc = async (khuVuc: KhuVuc) => {
  try {
    const response = await fetch(`${ipAddress}themKhuVuc`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(khuVuc),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Lỗi không xác định');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi thêm mới khu vực: ', error);
    throw error;
  }
};

export const capNhatKhuVuc = async (id: string, khuVuc: KhuVuc) => {
  try {
    const response = await fetch(`${ipAddress}capNhatKhuVuc/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(khuVuc),
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

/**
 *  API cho Nhân Viên
 */
export const getListNhanVien = async (): Promise<NhanVienSlice[]> => {
  try {
    const response = await fetch(`${ipAddress}layDsNhanVien`);
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

export const moCaLamViec = async (caLam: CaLam): Promise<CaLam> => {
  try {
    const response = await fetch(`${ipAddress}moCaLamViec`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(caLam),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Lỗi khi tạo ca làm!');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi mở ca làm mới: ', error);
    throw error;
  }
};

export const themNhanVien = async (formData: FormData) => {
  try {
    const response = await fetch(`${ipAddress}themNhanVien`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json(); // Nhận thông báo lỗi từ backend
      throw new Error(errorData.msg || 'Lỗi không xác định');
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    console.log('Lỗi thêm mới Nhân viên: ', error.message);
    throw error;
  }
};

export const updateNhanVien = async (id: string, formData: FormData) => {
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

export const checkLogin = async (phoneNumber: string) => {
  try {
    const response = await fetch(`${ipAddress}auth/checkLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phoneNumber}),
    });

    if (!response.ok) {
      throw new Error('Lỗi khi check login');
    }

    const data = await response.json();

    if (data.status === '404' || data.status === '403') {
      throw new Error(data.message); // Ném lỗi nếu có vấn đề
    }

    return data; // Trả về dữ liệu thành công
  } catch (error: any) {
    return {message: error.message || 'Đã xảy ra lỗi.'}; // Trả về thông điệp lỗi
  }
};

export const loginNhanVien = async (idToken: string) => {
  try {
    const response = await fetch(`${ipAddress}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`, // Thêm token vào header
      },
    });
    if (!response.ok) {
      throw new Error('Đăng nhập thất bại');
    }
    const data = await response.json();
    return data; // Trả về token và thông tin nhân viên
  } catch (error: any) {
    return error;
  }
};

export const getListCaLam = async (id_nhaHang: string): Promise<CaLam[]> => {
  try {
    const response = await fetch(
      `${ipAddress}layDsCaLamViec?id_nhaHang=${id_nhaHang}`,
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

export const getListChiTietHoaDonTheoCaLam = async (id_nhaHang: string) => {
  try {
    const response = await fetch(
      `${ipAddress}layCthdTheoCaLam?id_nhaHang=${id_nhaHang}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    );

    if (!response.ok) {
      // Kiểm tra xem backend trả về lỗi có chi tiết hay không
      const errorResponse = await response.json().catch(() => null);
      const errorMessage = errorResponse?.msg || 'Lỗi server khi xử lý yêu cầu';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Không thể kết nối tới server');
  }
};

export const addListChiTietHoaDon = async (
  id_hoaDon: string,
  monAn: Array<{id_monAn: string; soLuong: number; giaTien: number}>,
) => {
  try {
    const response = await fetch(`${ipAddress}addListChiTietHoaDon`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id_hoaDon: id_hoaDon, monAn: monAn}),
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

export const searchMonAn = async (textSearch: string, id_nhaHang: string) => {
  try {
    const response = await fetch(
      `${ipAddress}timKiemMonAn?textSearch=${textSearch}&id_nhaHang=${id_nhaHang}`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    );
    if (!response.ok) {
      throw new Error('Lỗi khi tìm kiếm món ăn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi tìm kiếm món ăn: ', error);
    return [];
  }
};

export const searchBan = async (textSearch: string): Promise<Ban[] | []> => {
  try {
    const response = await fetch(
      `${ipAddress}timKiemBan?textSearch=${textSearch}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      },
    );
    if (!response.ok) {
      throw new Error('Lỗi khi tìm kiếm bàn');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Lỗi khi tìm kiếm bàn: ', error);
    return [];
  }
};

export const thanhToanBanHang = async (
  dispatch: AppDispatch,
  payload: {
    chiTietHoaDons: Array<{
      id_monAn: string;
      soLuongMon: number;
      giaTien: number;
    }>;
    hoaDon: HoaDon;
    id_nhaHang: string;
    _id: string;
  },
) => {
  try {
    const response = await fetch(`${ipAddress}thanhToanHoaDonMoi`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      // Dispatch dữ liệu vào Redux store
      dispatch(hoaDonSlice.actions.themHoaDon(data.hoaDon)); // Thêm hóa đơn mới
      dispatch(
        chiTietHoaDonSlice.actions.themChiTietHoaDons(data.chiTietHoaDons),
      ); // Thêm danh sách chi tiết hóa đơn
      return data;
    } else {
      console.error('Lỗi từ server:', data.msg);
    }
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};
