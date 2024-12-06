// src/utils/dateUtils.js
export const convertTime = (thoiGian: string) => {
    if (!thoiGian) return ''; // Kiểm tra giá trị null/undefined
    const date = new Date(thoiGian);
  
    // Lấy giờ và phút
    const hours = date.getHours().toString().padStart(2, '0'); // Định dạng HH
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Định dạng MM
  
    // Lấy ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month bắt đầu từ 0
    const year = date.getFullYear();
  
    return `${hours}h${minutes} ngày ${day}/${month}`; // Kết hợp định dạng
  };
  