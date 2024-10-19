import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation, useRoute } from '@react-navigation/native';
import DeletePostModal from '../../customcomponent/modalDelete'; // Your custom delete modal
import { deleteNhanVienThunk } from '../../store/NhanVienSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { IPV4 } from '../../services/api';
import NhanVien from '../../services/models/NhanVienModel';

const EmployeeDetails = () => {
  const route = useRoute();

  const dispatch: AppDispatch = useDispatch(); 
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const { nhanVien } = route.params;


if (!nhanVien) {
  console.log('No nhanVien found in params');
  // Xử lý khi không có nhanVien
}

  const employeeImage = nhanVien.hinhAnh
    ? nhanVien.hinhAnh.replace('localhost', IPV4)  // Thay đổi IP theo cấu hình server
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  const copyToClipboard = () => {
    Clipboard.setString(nhanVien.soDienThoai);
    Alert.alert('Copied', 'Số điện thoại đã được sao chép vào bộ nhớ tạm');
  };

  const handleDelete = () => {
    dispatch(deleteNhanVienThunk(nhanVien._id))  // Gọi action xóa nhân viên
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Đã xóa nhân viên');  // Thông báo thành công
        navigation.goBack();  // Quay lại màn hình trước đó
      })
      .catch((error) => {
        Alert.alert('Lỗi', `Xóa nhân viên không thành công: ${error}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>TCE_RESTAURANT</Text>

      <Image style={styles.avatar} source={{ uri: employeeImage }} />

      <Text style={styles.employeeName}>{nhanVien.hoTen}</Text>
      <Text style={styles.employeeStatus}>{nhanVien.trangThai}</Text>

      <View style={styles.infoRow}>
        <Icon name="phone" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Số điện thoại</Text>
          <Text style={styles.infoSubtitle}>{nhanVien.soDienThoai}</Text>
        </View>

        <TouchableOpacity onPress={copyToClipboard}>
          <Icon name="content-copy" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <Icon name="credit-card" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Số CCCD</Text>
          <Text style={styles.infoSubtitle}>{nhanVien.cccd}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="work" size={24} color="#777" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Vai trò</Text>
          <Text style={styles.infoSubtitle}>{nhanVien.vaiTro}</Text>
        </View>
      </View>

      {/* Other employee details (ID card, manager info, etc.) */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('editEmployeeInfo', { nhanVien })}>
          <Text style={styles.buttonText}>Update Information</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <DeletePostModal
          title="Xóa thông tin nhân viên"
          content="Bạn có muốn xóa thông tin nhân viên không?"
          onDelete={handleDelete}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  employeeName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  employeeStatus: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  infoTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EmployeeDetails;
