import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation, useRoute} from '@react-navigation/native';
import DeletePostModal from '../../customcomponent/modalDelete'; // Your custom delete modal
import {deleteNhanVienThunk} from '../../store/Slices/NhanVienSlice';
import {AppDispatch} from '../../store/store';
import {useDispatch} from 'react-redux';
import {IPV4} from '../../services/api';
import {Linking} from 'react-native';
import LoadingModal from 'react-native-loading-modal';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {useToast} from '../../customcomponent/CustomToast';

const EmployeeDetails = () => {
  const route = useRoute();

  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const {showToast} = useToast();

  const {nhanVien} = route.params;
  const goiDien = () => {
    const phoneNumber = `tel:${nhanVien.soDienThoai}`;
    Linking.openURL(phoneNumber).catch(err => {
      Alert.alert('Lỗi', 'Không thể thực hiện cuộc gọi: ' + err.message);
    });
  };

  useEffect(() => {
    console.log(nhanVien);
  }, []);

  if (!nhanVien) {
    console.log('No nhanVien found in params');
    // Xử lý khi không có nhanVien
  }

  const copyToClipboard = () => {
    Clipboard.setString(nhanVien.soDienThoai);
    Alert.alert('Copied', 'Số điện thoại đã được sao chép vào bộ nhớ tạm');
  };

  const handleDelete = () => {
    setIsLoadingModal(true);
    dispatch(deleteNhanVienThunk(nhanVien._id)) // Gọi action xóa nhân viên
      .unwrap()
      .then(() => {
        showToast('check', 'Đã xóa thông tin nhân viên.', 'white', 1500);
        navigation.goBack(); // Quay lại màn hình trước đó
        setIsLoadingModal(false);
      })
      .catch(error => {
        setIsLoadingModal(false);
        showToast('remove', `Xóa nhân viên thất bại, ${error}!`, 'white', 2000);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>TCE_RESTAURANT</Text>

        <Image style={styles.avatar} source={{uri: nhanVien.hinhAnh}} />

        <Text style={styles.employeeName}>{nhanVien.hoTen}</Text>
        <View style={styles.box}>
          <Text
            style={[
              styles.statusText,
              nhanVien.trangThai ? styles.activeStatus : styles.inactiveStatus,
            ]}>
            {nhanVien.trangThai ? 'Hoạt động' : 'Ngừng hoạt động'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <TouchableOpacity onPress={goiDien}>
            <Icon name="phone" size={24} color="#777" />
          </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => navigation.navigate('EditEmployeeInfo', {nhanVien})}>
            <Text style={styles.buttonText}>Cập nhật thông tin nhân viên</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Xóa tài khoản</Text>
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
      <LoadingModal modalVisible={isLoadingModal} title='Đang xử lý ...' color={colors.orange} />
    </>
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
    color: 'black',
  },
  box: {
    width: '100%',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginVertical: 10,
    width: '30%',
    height: 30,
  },
  activeStatus: {
    color: 'green',
    borderColor: 'green',
    borderWidth: 1,
  },
  inactiveStatus: {
    color: 'red',
    borderColor: 'red',
    borderWidth: 1,
    width: '45%',
    height: 30,
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
