import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addNewNhanVien} from '../../store/NhanVienSlice';
import NhanVien from '../../services/models/NhanVienModel';
import {RootState} from '../../store/store';
import type {AppDispatch} from '../../store/store';
import {taoFormDataNhanVien} from './NhanVienRespository';
import {styles} from './styleThem';
import { openCamera, openImageLibrary } from '../../respositorys/CameraRespository';

const AddEmployeeScreen = () => {
  const navigation = useNavigation(); // Lấy đối tượng navigation để điều hướng
  const dispatch = useDispatch<AppDispatch>(); // Dispatch kiểu AppDispatch

  const [nhanVien, setNhanVien] = useState<NhanVien>(
    new NhanVien('', '', '', '', '', true, ''),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof NhanVien, string>>>(
    {},
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const roles = [
    {label: 'Quản lý', value: 'Quản lý'},
    {label: 'Đầu bếp', value: 'Đầu bếp'},
    {label: 'Nhân viên thu ngân', value: 'Nhân viên thu ngân'},
    {label: 'Nhân viên phục vụ', value: 'Nhân viên phục vụ'},
  ];

  const handleInputChange = (field: keyof NhanVien, value: string) => {
    setNhanVien(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleValidation = () => {
    const newErrors: Partial<Record<keyof NhanVien, string>> = {};
    const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    const citizenIDRegex = /^[0-9]{9}$|^[0-9]{12}$/;

    if (!nhanVien.hoTen) newErrors.hoTen = 'Tên nhân viên không được bỏ trống';
    if (!nhanVien.soDienThoai || !phoneRegex.test(nhanVien.soDienThoai))
      newErrors.soDienThoai = 'Số điện thoại không hợp lệ';
    if (!nhanVien.cccd || !citizenIDRegex.test(nhanVien.cccd))
      newErrors.cccd = 'Số CCCD không hợp lệ';
    // if (!employee.vaiTro) newErrors.vaiTro = 'Vui lòng chọn vai trò';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý khi nhấn "Lưu thông tin"
  const handleSave = () => {
    if (handleValidation()) {
      const formData = taoFormDataNhanVien(nhanVien);
      console.log('FormData:', formData);

      // Dispatch thêm nhân viên mới
      dispatch(addNewNhanVien(formData))
        .unwrap()
        .then(() => {
          Alert.alert('Thành công', 'Nhân viên đã được thêm');
          navigation.goBack(); // Điều hướng về màn hình danh sách nhân viên
        })
        .catch(error => {
          console.error('Lỗi thêm mới nhân viên: ', error);
          Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra');
        });
    } else {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin');
    }
  };

  // Sử dụng hàm `openCamera` từ repository
  const handleOpenCamera = async () => {
    const uri = await openCamera();
    if (uri) {
      console.log('Ảnh được chụp: ', uri);
      setNhanVien(prevState => ({
        ...prevState,
        hinhAnh: uri || undefined, // Lưu đường dẫn ảnh vào state
      }));
    }
    setModalVisible(false);
  };

  // Sử dụng hàm `openImageLibrary` từ repository
  const handleOpenImageLibrary = async () => {
    const uri = await openImageLibrary();
    if (uri) {
      console.log('Ảnh được chọn: ', uri);
      setNhanVien(prevState => ({
        ...prevState,
        hinhAnh: uri || undefined, // Lưu đường dẫn ảnh vào state
      }));
    }
    setModalVisible(false);
  };

  const viewImage = () => {
    if (nhanVien.hinhAnh) {
      setShowImage(true);
      setModalVisible(false);
    } else {
      Alert.alert('Vui lòng tải ảnh lên');
    }
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };
  
  useEffect(() => {
    // Ẩn thanh Drawer khi vào màn hình thêm nhân viên
    navigation.setOptions({
      drawerLockMode: 'locked-closed',  // Khóa Drawer
      headerShown: true,  // Hiện header của Stack
    });

    return () => {
      // Mở khóa Drawer khi thoát khỏi màn hình này
      navigation.setOptions({
        drawerLockMode: 'unlocked',
      });
    };
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{bottom: -26}}>
          {/* Khu vực bấm vào ảnh để chọn */}
          <Text style={styles.label}>Ảnh đại diện</Text>
          <TouchableOpacity
            onPress={handleImagePress}
            style={styles.imageContainer}>
            <TouchableOpacity
              onPress={handleImagePress}
              style={styles.imageContainer1}>
              <Text style={styles.uploadStatus}>
                <Image source={require('../../image/camera.png')} />
                {nhanVien.hinhAnh ? '' : ''}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleImagePress}
              style={{bottom: 32, left: 90}}>
              <Text style={styles.uploadStatus}>
                {nhanVien.hinhAnh ? 'Đã có ảnh tải lên' : 'Tải ảnh lên'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Tên nhân viên</Text>
        <TextInput
          style={[styles.input, errors.hoTen && styles.errorBorder]}
          placeholder="Nhập họ tên"
          value={nhanVien.hoTen}
          onChangeText={text => handleInputChange('hoTen', text)}
        />
        {errors.hoTen && <Text style={styles.errorText}>{errors.hoTen}</Text>}

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={[styles.input, errors.soDienThoai && styles.errorBorder]}
          placeholder="Nhập số điện thoại"
          value={nhanVien.soDienThoai}
          onChangeText={text => handleInputChange('soDienThoai', text)}
          keyboardType="numeric"
        />
        {errors.soDienThoai && (
          <Text style={styles.errorText}>{errors.soDienThoai}</Text>
        )}

        <Text style={styles.label}>Số Căn cước công dân</Text>
        <TextInput
          style={[styles.input, errors.hoTen && styles.errorBorder]}
          placeholder="Nhập số CCCD"
          value={nhanVien.cccd}
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
          value={nhanVien.vaiTro}
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
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={handleOpenCamera} style={styles.modalButton}>
                <Text style={styles.textButImage}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOpenImageLibrary}
                style={styles.modalButton}>
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
          onRequestClose={() => setShowImage(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowImage(false)}>
            {nhanVien.hinhAnh && (
              <Image source={{uri: nhanVien.hinhAnh}} style={styles.image} />
            )}
          </TouchableOpacity>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddEmployeeScreen;
