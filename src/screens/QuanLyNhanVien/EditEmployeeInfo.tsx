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
} from 'react-native';
import {styles} from './EditEmployeeInfoStyles';
import UnsavedChangesModal from '../../customcomponent/modalSave';
import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../../store/store';
import {updateNhanVienThunk} from '../../store/Slices/NhanVienSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import NhanVienModel from '../../services/models/NhanVienModel';
import {taoFormDataNhanVien} from './NhanVienRespository';
import {useToast} from '../../customcomponent/CustomToast';

function EditEmployeeInfo(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const route = useRoute();
  const {showToast} = useToast();

  const {nhanVien} = route.params;

  const [infoNhanVien, setInfoNhanVien] = useState<NhanVienModel>(nhanVien);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({}); // State lưu lỗi

  // Biểu thức chính quy kiểm tra đầu vào
  const phoneRegex = /^0\d{9}$/; // Số điện thoại bắt đầu bằng 0 và có 10-11 chữ số
  const cccdRegex = /^\d{12}$/; // CCCD phải có 12 chữ số

  const positions = [
    'Nhân viên phục vụ',
    'Quản lý',
    'Nhân viên thu ngân',
    'Đầu bếp',
  ];

  const handleInputChange = (field: keyof NhanVienModel, value: any) => {
    setInfoNhanVien(prevState => ({
      ...prevState,
      [field]: value,
    }));
    validateField(field, value);
  };

  const validateField = (field: keyof NhanVienModel, value: string) => {
    let errorMsg = '';
    if (field === 'soDienThoai') {
      if (!phoneRegex.test(value)) {
        errorMsg = 'Số điện thoại không hợp lệ. Vui lòng nhập 10 số.';
      }
    } else if (field === 'cccd') {
      if (!cccdRegex.test(value)) {
        errorMsg = 'Số CCCD phải gồm 12 chữ số.';
      }
    }
    setErrors(prevState => ({
      ...prevState,
      [field]: errorMsg,
    }));
  };

  const validateAllFields = () => {
    const newErrors: {[key: string]: string} = {};

    if (!phoneRegex.test(infoNhanVien.soDienThoai)) {
      newErrors.soDienThoai =
        'Số điện thoại không hợp lệ. Vui lòng nhập 10 số.';
    }
    if (!cccdRegex.test(infoNhanVien.cccd)) {
      newErrors.cccd = 'Số CCCD phải gồm 12 chữ số.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  useEffect(() => {
    if (JSON.stringify(infoNhanVien) !== JSON.stringify(nhanVien)) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [infoNhanVien, nhanVien]);

  const handleSave = () => {
    setModalVisible(true);
  };

  const handleConfirmSave = async () => {
    if (!validateAllFields()) {
      showToast('remove', 'Vui lòng kiểm tra lại thông tin.', '#CD3131', 3000);
      return;
    }

    setModalVisible(false);

    try {
      const nhanVienToSave = {...infoNhanVien};

      if (nhanVienToSave.hinhAnh === nhanVien.hinhAnh) {
        delete nhanVienToSave.hinhAnh;
      }

      const formData = taoFormDataNhanVien(nhanVienToSave);

      await dispatch(
        updateNhanVienThunk({id: nhanVien._id, formData}),
      ).unwrap();

      showToast(
        'check',
        'Cập nhật thông tin nhân viên thành công',
        'white',
        2000,
      );
      navigation.navigate('NhanVienList');
    } catch (error) {
      if (error.msg && error.error) {
        showToast('remove', error.msg, '#CD3131', 3000);
      } else {
        showToast(
          'remove',
          'Cập nhật thông tin không thành công!',
          '#CD3131',
          3000,
        );
      }
    }
  };

  const toggleStatus = () => {
    handleInputChange('trangThai', !infoNhanVien.trangThai);
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
        {errors.hoTen && <Text style={styles.errorText}>{errors.hoTen}</Text>}
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
        {errors.soDienThoai && (
          <Text style={styles.errorText}>{errors.soDienThoai}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Số Căn cước công dân</Text>
        <TextInput
          style={styles.input}
          value={infoNhanVien.cccd}
          onChangeText={text => handleInputChange('cccd', text)}
          keyboardType="numeric"
          placeholder="Nhập số CCCD"
          editable={false}
        />
        {errors.cccd && <Text style={styles.errorText}>{errors.cccd}</Text>}
      </View>

      <View style={styles.fr2}>
        <Text style={styles.label}>Vị trí</Text>
        <View style={styles.vtr}>
          <View style={styles.formGroupRow}>
            <Text style={styles.vaiTro}>{infoNhanVien.vaiTro}</Text>
            <TouchableOpacity onPress={() => setPickerVisible(true)}>
              <Text style={styles.iconStyle}>Thay đổi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button
        title="Lưu thay đổi"
        onPress={handleSave}
        disabled={!isEdited}
        color={isEdited ? 'blue' : 'gray'}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setPickerVisible(false)}
        />
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {positions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => {
                  handleInputChange('vaiTro', item);
                  setPickerVisible(false);
                }}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {isModalVisible && (
        <UnsavedChangesModal
          title="Lưu thay đổi"
          content="Bạn có chắc muốn lưu những thay đổi này?"
          onConfirm={handleConfirmSave}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </ScrollView>
  );
}

export default EditEmployeeInfo;
