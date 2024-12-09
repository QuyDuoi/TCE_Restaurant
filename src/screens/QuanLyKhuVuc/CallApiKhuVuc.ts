import axios from 'axios';
import { ipAddress } from '../../services/api';

export const fetchDataLichHen = async (id_nhaHang: string) => {
  try {
    const response = await axios.get(`${ipAddress}layDsLichHen?id_nhaHang=${id_nhaHang}`);
    console.log('Dữ liệu:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.msg);
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error('Không có phản hồi từ server:', error.request);
    } else {
      // Các lỗi khác
      console.error('Lỗi:', error.message);
    }
  }
}