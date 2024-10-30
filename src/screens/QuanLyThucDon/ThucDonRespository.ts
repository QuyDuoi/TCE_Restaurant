import { MonAn } from "../../store/MonAnSlice";

export const taoFormDataMonAn = (monAn : MonAn) => {
    const formData = new FormData();
    // Thêm các trường thông tin của nhân viên
    formData.append('tenMon', monAn.tenMon);
    formData.append('giaMonAn', monAn.giaMonAn);
    formData.append('moTa', monAn.moTa);
    formData.append('id_danhMuc', monAn.id_danhMuc);
    formData.append('trangThai', monAn.trangThai);
    if (monAn.id_nhomTopping) {
      formData.append('id_nhomTopping', monAn.id_nhomTopping);
    }

    // Kiểm tra xem có ảnh được chọn không
    if (monAn.anhMonAn) {
        const imageUri = monAn.anhMonAn;
        const fileName = imageUri.split('/').pop(); // Lấy tên file từ đường dẫn
        formData.append('anhMonAn', {
        uri: imageUri,
        type: 'image/jpeg', // Định dạng ảnh
        name: fileName,
      });
    }

    console.log("Thông tin formData: " + formData);

    return formData;
}