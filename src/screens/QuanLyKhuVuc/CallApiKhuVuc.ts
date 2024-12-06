import axios from 'axios';
import { ipAddress } from '../../services/api';

export const fetchDataLichHen = async (id_nhaHang: string) => {
  try {
    const response = await axios.get(`${ipAddress}layDsLichHen?id_nhaHang=${id_nhaHang}`);
    console.log('Dữ liệu:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server phản hồi với lỗi (4xx, 5xx)
      console.error('Lỗi từ server:', error.response.data);
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error('Không có phản hồi từ server:', error.request);
    } else {
      // Các lỗi khác
      console.error('Lỗi:', error.message);
    }
  }
}