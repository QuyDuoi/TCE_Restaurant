import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addNewNhanVien } from '../../store/NhanVienSlice';
import NhanVien from '../../services/models/NhanVienModel';
import {RootState} from '../../store/store';
import type {AppDispatch} from '../../store/store';

const AddEmployeeScreen = () => {
  const navigation = useNavigation();  // Lấy đối tượng navigation để điều hướng
  const dispatch = useDispatch<AppDispatch>(); // Dispatch kiểu AppDispatch
  
  const [employee, setEmployee] = useState<NhanVien>(new NhanVien('', '', '', '', '', true,''));
  const [errors, setErrors] = useState<Partial<Record<keyof NhanVien, string>>>(
    {},
  );
 
  const [modalVisible, setModalVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const roles = [
    { label: 'Quản lý', value: 'quan ly' },
    { label: 'Đầu bếp', value: 'dau bep' },
    { label: 'Nhân viên thu ngân', value: 'thu ngan' },
    { label: 'Nhân viên phục vụ', value: 'phuc vu' },
  ];

  const handleInputChange = (field: keyof NhanVien, value: string) => {
    setEmployee(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRoleSelect = (role: string) => {
    setEmployee(prevState => ({
      ...prevState,
      userRole: role,
    }));
  };

  const handleValidation = () => {
    const newErrors : Partial<Record<keyof NhanVien, string>> = {};
    const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    const citizenIDRegex = /^[0-9]{9}$|^[0-9]{12}$/;

    if (!employee.hoTen) newErrors.hoTen = 'Tên nhân viên không được bỏ trống';
    if (!employee.soDienThoai || !phoneRegex.test(employee.soDienThoai)) newErrors.soDienThoai = 'Số điện thoại không hợp lệ';
    if (!employee.cccd || !citizenIDRegex.test(employee.cccd)) newErrors.cccd = 'Số CCCD không hợp lệ';
    // if (!employee.vaiTro) newErrors.vaiTro = 'Vui lòng chọn vai trò';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý khi nhấn "Lưu thông tin"
  const handleSave = () => {
    if (handleValidation()) {
      const formData = new FormData();
      formData.append('hoTen', employee.hoTen);
      formData.append('soDienThoai', employee.soDienThoai);
      formData.append('cccd', employee.cccd);
      formData.append('vaiTro', employee.vaiTro || 'Nhân viên thu ngân');
      formData.append('trangThai', true);
      formData.append('id_nhaHang', '66fab50fa28ec489c7137537');
    
      // Thêm ảnh vào formData nếu có
      if (employee.hinhAnh) {
  const imageUri = employee.hinhAnh;
  const fileName = imageUri.split('/').pop(); // Lấy tên file từ đường dẫn

  // Tạo đối tượng file từ hình ảnh
  formData.append('hinhAnh', {
    uri: imageUri,
    type: 'image/jpeg', // Đảm bảo đúng loại file
    name: fileName,
  });
  
  console.log('Thêm ảnh vào formData:', { uri: imageUri, type: 'image/jpeg', name: fileName });
} else {
  console.log('Không có ảnh để thêm vào FormData');
}
    
      // Log dữ liệu FormData trước khi gửi đi
      console.log('FormData:', formData);
    
      dispatch(addNewNhanVien(formData)) // Gọi dispatch thêm nhân viên mới
        .unwrap()
        .then(() => {
          Alert.alert('Thành công', 'Nhân viên đã được thêm');
          navigation.goBack(); // Điều hướng về màn hình danh sách nhân viên sau khi thêm thành công
        })
        .catch((error) => {
          Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra');
        });
    } else {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin');
    }
  };
  
  
  
  const openCamera = async () => {
    await launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          console.log('Ảnh được chụp: ', uri); // Kiểm tra đường dẫn ảnh
          setImageUri(uri); // Cập nhật imageUri
          setEmployee(prevState => ({
            ...prevState,
            hinhAnh: uri || undefined, // Lưu đường dẫn ảnh vào state
          }));
        }
        setModalVisible(false);
      },
    );
  };
  
  const openImageLibrary = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log('Ảnh được chọn: ', uri); // Kiểm tra đường dẫn ảnh
        setImageUri(uri); // Cập nhật imageUri
        setEmployee(prevState => ({
          ...prevState,
          hinhAnh: uri || undefined, // Lưu đường dẫn ảnh vào state
        }));
      }
      setModalVisible(false);
    });
  };
  
  


  const viewImage = () => {
    if (imageUri) {
      setShowImage(true);
      setModalVisible(false);
    } else {
      Alert.alert('Vui lòng tải ảnh lên');
    }
  };


  const handleImagePress = () => {
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header với nút Back */}
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thêm nhân viên</Text>
        </View> */}
        <View style={{ bottom: -26 }}>
          {/* Khu vực bấm vào ảnh để chọn */}
          <Text style={styles.label}>Ảnh đại diện</Text>
          <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
            <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer1}>           
                <Text style={styles.uploadStatus}><Image source={require('../../image/camera.png')} />{imageUri ? '' : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePress} style={{ bottom: 32, left: 90 }}>
              <Text style={styles.uploadStatus}>{imageUri ? 'Đã có ảnh tải lên' : 'Tải ảnh lên'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Tên nhân viên</Text>
        <TextInput
          style={[styles.input, errors.hoTen && styles.errorBorder]}
          placeholder="Nhập họ tên"
          value={employee.hoTen}
          onChangeText={text => handleInputChange('hoTen', text)}
        />
        {errors.hoTen && <Text style={styles.errorText}>{errors.hoTen}</Text>}

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={[styles.input, errors.soDienThoai && styles.errorBorder]}
          placeholder="Nhập số điện thoại"
          value={employee.soDienThoai}
          onChangeText={text => handleInputChange('soDienThoai', text)}
          keyboardType="numeric"
        />
        {errors.soDienThoai && <Text style={styles.errorText}>{errors.soDienThoai}</Text>}

        <Text style={styles.label}>Số Căn cước công dân</Text>
        <TextInput
          style={[styles.input, errors.hoTen && styles.errorBorder]}
          placeholder="Nhập số CCCD"
          value={employee.cccd}
          onChangeText={text => handleInputChange('cccd', text)}
          keyboardType="numeric"
        />
        {errors.cccd && <Text style={styles.errorText}>{errors.cccd}</Text>}

        <Text style={styles.label}>Chỉ định vị trí</Text>
        <Dropdown
          style={[styles.dropdown, errors.vaiTro && styles.errorBorder]}
          data={roles}
          labelField="label"
          valueField="value"
          placeholder="Chọn vai trò"
          value={employee.vaiTro}
          onChange={item => handleInputChange('vaiTro', item.value)}
        />
        {errors.vaiTro && <Text style={styles.errorText}>{errors.vaiTro}</Text>}


        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu thông tin</Text>
        </TouchableOpacity>

        {/* Modal lựa chọn ảnh */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={openCamera} style={styles.modalButton}>
                <Text style={styles.textButImage}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openImageLibrary} style={styles.modalButton}>
                <Text style={styles.textButImage}>Chọn từ thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={viewImage} style={styles.modalButton}>
                <Text style={styles.textButImage}>Xem ảnh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal xem ảnh */}
        <Modal
          transparent={true}
          visible={showImage}
          animationType="slide"
          onRequestClose={() => setShowImage(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowImage(false)}
          >
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

          </TouchableOpacity>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    right: 15
    
  },
  backButton: {
    marginRight: 8,
    left: -100
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '700',
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 100,
    width: '100%'
  },
  imageContainer1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '15%'
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  uploadStatus: {
    textAlign: 'center',
    fontWeight: 'bold',
    height: '90%',
    width: '90%',
    fontSize: 18

  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đây là phần làm nền mờ
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  textButImage: {
    fontSize: 18
  },
  imageViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {

    width: 300,
    height: 300,
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddEmployeeScreen;
