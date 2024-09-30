import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';



const AddEmployeeScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [citizenID, setCitizenID] = useState('');
  const [role, setRole] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [errors, setErrors] = useState({});


  const roles = [
    { label: 'Quản lý', value: 'quanly' },
    { label: 'Đầu bếp', value: 'daubep' },
    { label: 'Nhân viên thu ngân', value: 'thungan' },
    { label: 'Nhân viên phục vụ', value: 'phucvu' },
  ];

  const handleValidation = () => {
    const newErrors = {};
    const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    const citizenIDRegex = /^[0-9]{9,12}$/;

    if (!name) newErrors.name = 'Họ tên là bắt buộc';
    if (!phone || !phoneRegex.test(phone)) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!citizenID || !citizenIDRegex.test(citizenID)) newErrors.citizenID = 'Số CCCD không hợp lệ';
    if (!role) newErrors.role = 'Vui lòng chọn vai trò';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      Alert.alert('Thành công', 'Nhân viên đã được thêm');
    } else {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin');
    }
  };

  const openCamera = () => {
    launchCamera({}, response => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
        setModalVisible(false);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({}, response => {
      if (response.assets) {
        setImageUri(response.assets[0].uri);
        setModalVisible(false);
      }
    });
  };

  const viewImage = () => {
    if (imageUri) {
      setShowImage(true);
      setModalVisible(false);
    } else {
      Alert.alert('Chưa có ảnh', 'Vui lòng chọn ảnh trước');
    }
  };


  const handleImagePress = () => {
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header với nút Back */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thêm nhân viên</Text>
        </View>
        <View style={{ bottom: -26 }}>
          {/* Khu vực bấm vào ảnh để chọn */}
          <Text style={styles.label}>Ảnh đại diện</Text>
          <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
            <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer1}>           
                <Text style={styles.uploadStatus}><Image source={require('./image/camera.png')} />{imageUri ? '' : ''}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePress} style={{ bottom: 32, left: 90 }}>
              <Text style={styles.uploadStatus}>{imageUri ? 'Đã có ảnh tải lên' : 'Tải ảnh lên'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Tên nhân viên</Text>
        <TextInput
          style={[styles.input, errors.name && styles.errorBorder]}
          placeholder="Nhập họ tên"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.errorBorder]}
          placeholder="Nhập số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <Text style={styles.label}>Số Căn cước công dân</Text>
        <TextInput
          style={[styles.input, errors.citizenID && styles.errorBorder]}
          placeholder="Nhập số CCCD"
          value={citizenID}
          onChangeText={setCitizenID}
          keyboardType="numeric"
        />
        {errors.citizenID && <Text style={styles.errorText}>{errors.citizenID}</Text>}

        <Text style={styles.label}>Chỉ định vị trí</Text>
        <Dropdown
          style={[styles.dropdown, errors.role && styles.errorBorder]}
          data={roles}
          labelField="label"
          valueField="value"
          placeholder="Chọn vai trò"
          value={role}
          onChange={item => setRole(item.value)}
        />
        {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}


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
                <Text>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openGallery} style={styles.modalButton}>
                <Text>Chọn từ thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={viewImage} style={styles.modalButton}>
                <Text>Xem ảnh</Text>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 8,
    left: -10
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
