import NhanVienModel from "../../services/models/NhanVienModel";

export const taoFormDataNhanVien = (nhanVien : NhanVienModel) => {
    const formData = new FormData();
    // Thêm các trường thông tin của nhân viên
    formData.append('hoTen', nhanVien.hoTen);
    formData.append('soDienThoai', nhanVien.soDienThoai);
    formData.append('cccd', nhanVien.cccd);
    formData.append('vaiTro', nhanVien.vaiTro || 'Nhân viên thu ngân');
    formData.append('trangThai', nhanVien.trangThai);
    formData.append('id_nhaHang', '66fab50fa28ec489c7137537');

    // Kiểm tra xem có ảnh được chọn không
    if (nhanVien.hinhAnh) {
      const imageUri = nhanVien.hinhAnh;
      // Kiểm tra nếu ảnh là từ camera hoặc thư viện (bắt đầu bằng "file://")
      if (imageUri.startsWith('file://') || imageUri.startsWith('/')) {
        const fileName = imageUri.split('/').pop(); // Lấy tên file từ đường dẫn
        formData.append('hinhAnh', {
          uri: imageUri,
          type: 'image/jpeg', // Định dạng ảnh
          name: fileName,
        });
      }
    };

    console.log("Thông tin formData: " + formData);

    return formData;
}