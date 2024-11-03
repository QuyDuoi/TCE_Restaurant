import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {styles} from './EditEmployeeInfoStyles';
import UnsavedChangesModal from '../../customcomponent/modalSave';
import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../../store/store';
import {updateNhanVienThunk} from '../../store/NhanVienSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import NhanVienModel from '../../services/models/NhanVienModel';
import {taoFormDataNhanVien} from './NhanVienRespository';

function EditEmployeeInfo(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const route = useRoute();

  // Nhận dữ liệu nhân viên từ route.params
  const {nhanVien} = route.params;

  // State quản lý các trường thông tin
  const [infoNhanVien, setInfoNhanVien] = useState<NhanVienModel>(nhanVien); // Sử dụng model

  const [isPickerVisible, setPickerVisible] = useState(false); // Modal chọn vai trò
  const [isEdited, setIsEdited] = useState(false); // Kiểm tra xem thông tin đã bị chỉnh sửa chưa
  const [isModalVisible, setModalVisible] = useState(false); // State cho modal xác nhận

  const positions = [
    'Nhân viên phục vụ',
    'Quản lý',
    'Nhân viên thu ngân',
    'Đầu bếp',
  ]; // Các vai trò có thể chọn

  // Hàm xử lý thay đổi giá trị trong infoNhanVien
  const handleInputChange = (field: keyof NhanVienModel, value: any) => {
    setInfoNhanVien(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Kiểm tra nếu thông tin đã bị thay đổi so với dữ liệu ban đầu
  useEffect(() => {
    if (JSON.stringify(infoNhanVien) !== JSON.stringify(nhanVien)) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [infoNhanVien, nhanVien]);

  // Hàm lưu dữ liệu
  const handleSave = () => {
    setModalVisible(true); // Hiển thị modal xác nhận trước khi lưu
  };

  // Hàm xác nhận lưu dữ liệu
  const handleConfirmSave = async () => {
    setModalVisible(false);

    try {
      const nhanVienToSave = {...infoNhanVien}; // Tạo bản sao của infoNhanVien

      // Nếu hình ảnh không thay đổi (nghĩa là nó vẫn giữ giá trị cũ), thì loại bỏ nó khỏi formData
      if (nhanVienToSave.hinhAnh === nhanVien.hinhAnh) {
        delete nhanVienToSave.hinhAnh; // Loại bỏ hình ảnh để không gửi lên backend
      }

      const formData = taoFormDataNhanVien(nhanVienToSave);
      console.log(nhanVienToSave.trangThai);

      const resultAction = await dispatch(
        updateNhanVienThunk({id: nhanVien._id, formData}),
      );

      if (updateNhanVienThunk.fulfilled.match(resultAction)) {
        Alert.alert('Thành công', 'Cập nhật thông tin nhân viên thành công');
        navigation.navigate('NhanVienList'); // Quay về trang danh sách
      } else {
        if (resultAction.payload) {
          Alert.alert('Lỗi', resultAction.payload);
        } else {
          Alert.alert('Lỗi', 'Cập nhật thông tin không thành công');
        }
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật nhân viên:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin');
    }
  };

  // Chuyển đổi trạng thái hoạt động
  const toggleStatus = () => {
    handleInputChange('trangThai', !infoNhanVien.trangThai); // Đảo ngược trạng thái khi chuyển đổi
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tên nhân viên</Text>
        <TextInput
          style={styles.input}
          value={infoNhanVien.hoTen}
          onChangeText={text => handleInputChange('hoTen', text)}
          placeholder="Nhập tên nhân viên"
        />
      </View>

      <View style={styles.formGroupRow}>
        <Text style={styles.label}>Trạng thái</Text>
        <View style={styles.formGroupRow1}>
          <Text
            style={[
              styles.statusText,
              {
                color: infoNhanVien.trangThai ? 'green' : 'red',
                borderColor: infoNhanVien.trangThai ? 'green' : 'red',
              },
            ]}>
            {infoNhanVien.trangThai ? 'Hoạt động' : 'Ngưng hoạt động'}
          </Text>
          <Switch
            value={infoNhanVien.trangThai}
            onValueChange={toggleStatus}
            thumbColor={infoNhanVien.trangThai ? 'green' : 'gray'}
            trackColor={{false: '#d3d3d3', true: '#81b0ff'}}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={infoNhanVien.soDienThoai}
          onChangeText={text => handleInputChange('soDienThoai', text)}
          keyboardType="numeric"
          placeholder="Nhập số điện thoại"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Số Căn cước công dân</Text>
        <TextInput
          style={styles.input}
          value={infoNhanVien.cccd}
          onChangeText={text => handleInputChange('cccd', text)}
          editable={true}
          placeholder="Nhập số CCCD"
        />
      </View>

      <View style={styles.fr2}>
        <Text style={styles.label}>Vị trí</Text>
        <View style={styles.vtr}>
          <View style={styles.formGroupRow}>
            <Text style={styles.input}>{infoNhanVien.vaiTro}</Text>
            <TouchableOpacity onPress={() => setPickerVisible(true)}>
              <Text style={styles.iconStyle}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isPickerVisible}
            onRequestClose={() => setPickerVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setPickerVisible(false)}>
                  <Text>×</Text>
                </TouchableOpacity>
                {positions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.item}
                    onPress={() => {
                      handleInputChange('vaiTro', item); // Cập nhật vai trò
                      setPickerVisible(false); // Đóng modal sau khi chọn
                    }}>
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <Button
        title="Lưu thay đổi"
        onPress={handleSave}
        disabled={!isEdited} // Chỉ kích hoạt nút Lưu nếu có thay đổi
        color={isEdited ? 'blue' : 'gray'}
      />

      {isModalVisible && (
        <UnsavedChangesModal
          title="Lưu thay đổi"
          content="Bạn có chắc muốn lưu những thay đổi này?"
          onConfirm={handleConfirmSave} // Xử lý khi người dùng xác nhận lưu
          onCancel={() => setModalVisible(false)} // Đóng modal nếu người dùng hủy
        />
      )}
    </ScrollView>
  );
}

export default EditEmployeeInfo;
