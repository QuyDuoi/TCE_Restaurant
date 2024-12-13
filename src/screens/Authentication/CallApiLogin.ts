import axios from 'axios';
import { ipAddress } from '../../services/api';

export const checkPhoneNumber = async (phoneNumber: string) => {
  try {
    const response = await axios.post(`${ipAddress}auth/checkLogin`, { phoneNumber });

    if (response.status === 200) {
      console.log(response.data.message);
      // Xử lý thành công (e.g., hiển thị thông báo gửi OTP)
      return response.status;
    }
  } catch (error) {
    if (error.response) {
      // Xử lý lỗi từ phía server
      const { statusError, message } = error.response.data;
      return { message, statusError };
    } else {
      // Xử lý lỗi từ phía client hoặc lỗi mạng
      console.error('Network or Client Error:', error.message);
      return { error: 'Lỗi kết nối hoặc lỗi không xác định' };
    }
  }
};

export const checkLogin = async (idToken: string) => {
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