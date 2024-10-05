import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, TouchableOpacity, Image, Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from 'react-native-modal';

const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [category, setCategory] = useState(null);
  const [topping, setTopping] = useState(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  // Dữ liệu cho dropdown "Loại hàng" (Danh mục)

  interface Category {
    label: string;
    value: string;
  }
  const categories: Category[] = [
    { label: 'Món chính', value: '1' },
    { label: 'Món phụ', value: '2' },
    { label: 'Đồ uống', value: '3' },
    { label: 'Tráng miệng', value: '4' },
  ];

  // Dữ liệu cho dropdown "Nhóm topping"
  const toppingData = [
    { label: 'Tương ớt', value: '1' },
    { label: 'Xì dầu', value: '2' },
    { label: 'Tương cà', value: '3' },
    { label: 'Mayonnaise', value: '4' },
  ];

  // Yêu cầu quyền truy cập camera
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Quyền truy cập Camera',
            message: 'Ứng dụng cần quyền truy cập vào camera của bạn.',
            buttonNeutral: 'Hỏi lại sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Mở camera nếu có quyền
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
        if (response.didCancel) {
          console.log('Người dùng đã hủy chụp ảnh');
        } else if (response.errorCode) {
          console.log('Lỗi chụp ảnh: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
        setModalVisible(false);
      });
    } else {
      console.log('Không có quyền truy cập camera');
      setModalVisible(false);
    }
  };

  // Mở thư viện ảnh
  const openLibrary = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Người dùng đã hủy chọn ảnh');
      } else if (response.errorCode) {
        console.log('Lỗi chọn ảnh: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
      setModalVisible(false);
    });
  };

  // Hiển thị modal chọn ảnh
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Image Upload */}
      <TouchableOpacity style={styles.imageUpload} onPress={toggleModal}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Chọn ảnh</Text>
        )}
      </TouchableOpacity>

      {/* Modal */}
      <Modal isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
            <Text style={styles.modalButtonText}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={openLibrary}>
            <Text style={styles.modalButtonText}>Chọn từ thư viện</Text>
          </TouchableOpacity>
        </View>
      </Modal>


      {/* Dropdown for Category Selection */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Danh mục</Text>
        <Dropdown
          style={styles.dropdownRight}
          data={categories}
          labelField="label"
          valueField="value"
          placeholder="Chọn loại hàng"
          value={selectedCategory}
          onChange={item => setSelectedCategory(item.value)}
          search
          searchPlaceholder="Tìm kiếm..."
        />
      </View>


      {/* Product Name */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Tên:</Text>
        <TextInput
          style={styles.inputRight}
          value={productName}
          onChangeText={setProductName}
          placeholder="Nhập tên món ăn"
          textAlign="right" // Nội dung nhập sẽ hiển thị từ phải sang trái
        />
      </View>

      {/* Price */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Giá bán</Text>
        <TextInput
          style={styles.inputRight}
          value={price}
          onChangeText={setPrice}
          placeholder="Nhập giá bán"
          keyboardType="numeric"
          textAlign="right" // Hiển thị nội dung từ phải sang trái
        />
      </View>


      {/* Description */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Nhập mô tả"
          multiline // Cho phép nhập nhiều dòng
          textAlign="right" // Hiển thị nội dung từ phải sang trái
        />
      </View>


      {/* Dropdown for Topping Selection */}
      <View style={styles.inputRow2}>
        <Text style={styles.label}>Topping</Text>
        <Dropdown
          style={styles.dropdownRight}
          data={toppingData} // Dữ liệu topping
          labelField="label"
          valueField="value"
          placeholder="Chọn loại topping"
          value={topping} // Lưu trữ giá trị đã chọn
          onChange={item => {
            setTopping(item.value); // Cập nhật giá trị đã chọn
          }}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
        />
      </View>





      {/* Submit Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => { }}>
        <Text style={styles.addButtonText}>THÊM SẢN PHẨM</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  addButton: {
    position: 'absolute', // Cố định nút ở một vị trí trên màn hình
    bottom: -230, // Đưa nút xuống cuối màn hình
    left: 0, // Căn lề trái
    right: 0, // Căn lề phải
    backgroundColor: 'green', // Màu nền nút
    padding: 16, // Đệm nội dung nút
    alignItems: 'center', // Căn giữa nội dung nút theo chiều ngang
    justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
    margin: 20
  },
  addButtonText: {
    color: 'white',
    fontSize: 16, // Kích thước chữ
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row', // Căn nội dung theo hàng ngang
    justifyContent: 'space-between', // Căn đều nội dung giữa tiêu đề và input
    alignItems: 'center', // Căn giữa chiều dọc
    marginBottom: 16,
  },
  inputRow2: {
    flexDirection: 'row', // Căn nội dung theo hàng ngang
    justifyContent: 'space-between', // Căn đều nội dung giữa tiêu đề và input
    alignItems: 'center', // Căn giữa chiều dọc
    marginTop: 50,

  },

  label: {
    fontSize: 16,
    color: 'black',
    width: '20%', // Tiêu đề chiếm 30% chiều ngang
    marginLeft: -5
  },
  inputRight: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '80%', // Input chiếm 65% chiều ngang
  },
  descriptionInput: {
    height: '200%', // Chiều cao lớn hơn theo phần trăm màn hình
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '80%', // Input chiếm 65% chiều ngang
    textAlignVertical: 'top', // Căn văn bản từ trên xuống dưới
    textAlign: 'right', // Căn chữ từ phải sang trái
    top: 25
  },
  dropdownRight: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '80%', // Dropdown chiếm 65% chiều ngang
    textAlign: 'right', // Căn chữ từ phải sang trái
  },
  input: {
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#EAFEE6',

  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageUpload: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#EAFEE6',
    padding: 40,
    marginLeft: 100,
    borderRadius: 20,
    width: 150,
    height: 150
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: 'green',
  },
  dropdown: {
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EAFEE6',
    marginBottom: 10,
    marginTop: 5
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default AddProductScreen;
