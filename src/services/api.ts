export const IPV4 = '192.168.1.52';  // Địa chỉ IP giả định của server

export const ipAddress = `http://${IPV4}:3000/api/`;  // Địa chỉ cơ sở API

import  NhomTopping  from './models/NhomToppingModel';
import  Topping  from './models/ToppingModel';
import  HoaDon  from './models/HoaDonModel';
import  ChiTietHoaDon  from './models/ChiTietHoaDonModel';

export const themDanhMuc = async () => {
  try {
    
  } catch (error) {
    
  }
};

export const suaDanhMuc = async () => {
  try {
    
  } catch (error) {
    
  }
};

export const layDsDanhMuc = async () => {
  try {
    
  } catch (error) {
    
  }
};

/**
 *  API cho NhomTopping
 */

// Lấy danh sách NhomTopping
export const getListNhomTopping = async (): Promise<NhomTopping[]> => {
  try {
    const response = await fetch(`${ipAddress}getListNhomTopping`);
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
export const addNhomTopping = async (formData: NhomTopping): Promise<NhomTopping> => {
  try {
    const response = await fetch(`${ipAddress}addNhomTopping`, {
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
export const updateNhomTopping = async (id: string, formData: NhomTopping): Promise<NhomTopping> => {
  try {
    const response = await fetch(`${ipAddress}updateNhomTopping/${id}`, {
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

/**
 *  API cho Topping
 */

// Lấy danh sách Topping
export const getListTopping = async (): Promise<Topping[]> => {
  try {
    const response = await fetch(`${ipAddress}getListTopping`);
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
    const response = await fetch(`${ipAddress}addTopping`, {
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
export const updateTopping = async (id: string, formData: Topping): Promise<Topping> => {
  try {
    const response = await fetch(`${ipAddress}updateTopping/${id}`, {
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

/**
 *  API cho HoaDon
 */

// Lấy danh sách HoaDon
export const getListHoaDon = async (): Promise<HoaDon[]> => {
  try {
    const response = await fetch(`${ipAddress}getListHoaDon`);
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
export const updateHoaDon = async (id: string, formData: HoaDon): Promise<HoaDon> => {
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

/**
 *  API cho ChiTietHoaDon
 */

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
export const addChiTietHoaDon = async (formData: ChiTietHoaDon): Promise<ChiTietHoaDon> => {
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
export const updateChiTietHoaDon = async (id: string, formData: ChiTietHoaDon): Promise<ChiTietHoaDon> => {
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