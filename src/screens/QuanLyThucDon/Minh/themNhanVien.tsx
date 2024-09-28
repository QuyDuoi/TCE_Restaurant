import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Bạn có thể dùng bất kỳ thư viện icon nào


const positions = [
  { label: 'Quản lý', value: 'manager' },
  { label: 'Đầu bếp', value: 'chef' },
  { label: 'Nhân viên phục vụ', value: 'waiter' },
  { label: 'Nhân viên thu ngân', value: 'cashier' },


];

const AddEmployeeScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [position, setPosition] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Mở modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Hỏi quyền truy cập máy ảnh
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cấp quyền truy cập camera',
          message: 'Ứng dụng cần quyền truy cập camera để chụp ảnh.',
          buttonNeutral: 'Để sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Đồng ý',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await check(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) return true;
      return request(PERMISSIONS.IOS.CAMERA) === RESULTS.GRANTED;
    }
  };

  // Hỏi quyền truy cập thư viện ảnh
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cấp quyền truy cập thư viện ảnh',
          message: 'Ứng dụng cần quyền truy cập thư viện ảnh.',
          buttonNeutral: 'Để sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Đồng ý',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (result === RESULTS.GRANTED) return true;
      return request(PERMISSIONS.IOS.PHOTO_LIBRARY) === RESULTS.GRANTED;
    }
  };

  // Chụp ảnh
  const handleTakePhoto = async () => {
    const hasCameraPermission = await requestCameraPermission();
    if (hasCameraPermission) {
      ImagePicker.launchCamera({}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setPhoto(response.assets[0].uri);
          closeModal();
        }
      });
    } else {
      Alert.alert('Cảnh báo', 'Bạn chưa cấp quyền truy cập camera.');
    }
  };

  // Chọn ảnh từ thư viện
  const handleChoosePhoto = async () => {
    const hasGalleryPermission = await requestGalleryPermission();
    if (hasGalleryPermission) {
      ImagePicker.launchImageLibrary({}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          setPhoto(response.assets[0].uri);
          closeModal();
        }
      });
    } else {
      Alert.alert('Cảnh báo', 'Bạn chưa cấp quyền truy cập thư viện.');
    }
  };

  // Lưu thông tin nhân viên
  const handleSave = () => {
    // Code logic lưu thông tin nhân viên
    console.log('Lưu thông tin', { name, phone, idNumber, position });
  };

  return (
    <View style={styles.container}>
      {/* Header với nút Back */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm nhân viên</Text>
      </View>

      {/* Ảnh đại diện */}
      <Text style={styles.label}>Ảnh đại diện</Text>
      <TouchableOpacity style={styles.photoButton} onPress={openModal}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>Tải ảnh lên</Text>
        )}
      </TouchableOpacity>

      {/* Họ tên nhân viên */}
      <Text style={styles.label}>Họ tên nhân viên</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ tên"
        value={name}
        onChangeText={setName}
      />

      {/* Số điện thoại */}
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Số căn cước công dân */}
      <Text style={styles.label}>Số Căn cước công dân</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số"
        keyboardType="numeric"
        value={idNumber}
        onChangeText={setIdNumber}
      />

      {/* Chỉ định vị trí */}
      <Text style={styles.label}>Chỉ định vị trí</Text>
      <Dropdown
        style={styles.dropdown}
        data={positions}
        labelField="label"
        valueField="value"
        placeholder="Chọn vị trí"
        value={position}
        onChange={item => setPosition(item.value)}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
      />

      {/* Nút Lưu thông tin */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu thông tin</Text>
      </TouchableOpacity>

      {/* Modal Chụp ảnh hoặc Chọn ảnh */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {/* Các nút sẽ nằm ở phía dưới màn hình */}
                <View style={styles.buttonContainer}>
                  {/* Nút Chụp ảnh */}
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleTakePhoto}
                  >
                    <Text style={styles.modalButtonText}>Chụp ảnh</Text>
                  </TouchableOpacity>

                  {/* Nút Chọn ảnh */}
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleChoosePhoto}
                  >
                    <Text style={styles.modalButtonText}>Chọn ảnh</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  photoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  photoText: {
    color: '#888',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalButton: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 8,
    marginLeft: -10
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 70
  },
});

export default AddEmployeeScreen;
