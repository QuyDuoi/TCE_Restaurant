import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useRoute} from '@react-navigation/native';
import {MonAn} from '../../store/MonAnSlice';
import {DanhMuc} from '../../store/DanhMucSlice';

const categories = [
  {label: 'Món chính', value: '1'},
  {label: 'Món phụ', value: '2'},
  {label: 'Đồ uống', value: '3'},
  {label: 'Tráng miệng', value: '4'},
];

const toppings = [
  {label: 'Tương ớt', value: '1'},
  {label: 'Xì dầu', value: '2'},
  {label: 'Sốt mayonnaise', value: '3'},
];

const ProductDetailScreen = ({route}: {route: any}) => {
  //Sử dụng useRoute để lấy các tham số đã truyền
  const {monAn, dsDanhMuc} = route.params;

  const [selectedCategory, setSelectedCategory] = useState('1');
  const [productName, setProductName] = useState('Rau muống xào tỏi');
  const [productPrice, setProductPrice] = useState('15000');
  const [moTa, setMoTa] = useState(monAn.moTa);
  const [productStatus, setProductStatus] = useState(true);
  const [selectedTopping, setSelectedTopping] = useState(['1', '2']);
  const [productImage, setProductImage] = useState({
    uri: 'https://i.pinimg.com/236x/59/f0/d0/59f0d0067c5d04c5db5f92f517767002.jpg',
  }); // Ảnh mặc định
  const [hasChanges, setHasChanges] = useState(false); // Trạng thái kiểm tra thông tin có thay đổi
  const [showImageOptions, setShowImageOptions] = useState(false); // Trạng thái hiển thị popup chọn ảnh

  useEffect(() => {
    // Kiểm tra xem có thông tin nào bị thay đổi
    if (
      productName !== 'Rau muống xào tỏi' ||
      productPrice !== '15000' ||
      moTa !== 'Rau muống, tỏi' ||
      selectedCategory !== '1' ||
      selectedTopping.toString() !== ['1', '2'].toString()
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [productName, productPrice, moTa, selectedCategory, selectedTopping]);

  const handleSaveProduct = () => {
    if (hasChanges) {
      console.log(monAn.moTa);
      Alert.alert('Cập nhật thành công!', 'Sản phẩm đã được cập nhật.');
    }
  };

  const handleDeleteProduct = () => {
    Alert.alert('Xóa sản phẩm', 'Bạn có chắc muốn xóa sản phẩm này?', [
      {text: 'Hủy', style: 'cancel'},
      {text: 'Đồng ý', onPress: () => Alert.alert('Sản phẩm đã bị xóa')},
    ]);
  };

  // Hàm xử lý chọn ảnh
  const handleChooseImage = () => {
    setShowImageOptions(true); // Hiển thị popup chọn ảnh
  };

  // Mở camera
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('Người dùng đã hủy chọn ảnh');
        } else if (response.errorCode) {
          console.log('Lỗi ImagePicker: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const source = {uri: response.assets[0].uri};
          setProductImage({uri: source.uri || ''});
          setShowImageOptions(false); // Đóng popup sau khi chọn
        }
      },
    );
  };

  // Mở thư viện ảnh
  const openImageLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const source = {uri: response.assets?.[0]?.uri || ''};
          setProductImage(source);
          setShowImageOptions(false); // Đóng popup sau khi chọn
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Hiển thị ảnh */}
        <TouchableOpacity onPress={handleChooseImage}>
          <Image source={productImage} style={styles.productImage} />
        </TouchableOpacity>

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

        {/* Name */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputRight}
            value={monAn.tenMon}
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
            value={monAn.giaMonAn.toString()}
            onChangeText={setProductPrice}
            placeholder="Nhập giá bán"
            textAlign="right" // Hiển thị nội dung từ phải sang trái
          />
        </View>

        {/* Description */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            style={styles.descriptionInput}
            value={moTa}
            onChangeText={setMoTa}
            placeholder="Nhập mô tả"
            multiline // Cho phép nhập nhiều dòng
            textAlign="right" // Hiển thị nội dung từ phải sang trái
          />
        </View>

        {/* <View style={styles.row}>
            <Text style={styles.label}>Trạng thái sản phẩm</Text>
            <TouchableOpacity
              style={[styles.switch, productStatus ? styles.switchOn : styles.switchOff]}
              onPress={() => setProductStatus(!productStatus)}
            >
              <Text style={styles.switchText}>{productStatus ? 'Còn hàng' : 'Hết hàng'}</Text>
            </TouchableOpacity>
          </View> */}

        {/* Dropdown for Topping Selection */}
        <View style={styles.inputRow2}>
          <Text style={styles.label}>Topping</Text>
          <Dropdown
            style={styles.dropdownRight}
            data={toppings}
            labelField="label"
            valueField="value"
            placeholder="Chọn topping"
            value={selectedTopping as any}
            onChange={item => setSelectedTopping(item.value)}
            search
            searchPlaceholder="Tìm kiếm..."
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            //multiple
          />
        </View>
      </ScrollView>

      {/* Nút lưu */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          hasChanges ? styles.saveButtonActive : styles.saveButtonInactive,
        ]}
        onPress={handleSaveProduct}
        disabled={!hasChanges}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>

      {/* Nút xóa */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteProduct}>
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>

      {/* Popup chọn ảnh */}
      <Modal
        visible={showImageOptions}
        transparent={true}
        animationType="slide">
        <Pressable
          style={styles.modalBackground}
          onPress={() => setShowImageOptions(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={openCamera} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openImageLibrary}
              style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Chọn từ thư viện</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100, // Để chừa không gian cho nút lưu cố định
  },
  label: {
    fontSize: 16,
    color: 'black',
    width: '20%', // Tiêu đề chiếm 30% chiều ngang
    marginLeft: -5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
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
    top: 25,
  },
  inputRow: {
    flexDirection: 'row', // Căn nội dung theo hàng ngang
    justifyContent: 'space-between', // Căn đều nội dung giữa tiêu đề và input
    alignItems: 'center', // Căn giữa chiều dọc
    marginBottom: 16,
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
  inputRight: {
    height: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '80%', // Input chiếm 65% chiều ngang
  },
  inputRow2: {
    flexDirection: 'row', // Căn nội dung theo hàng ngang
    justifyContent: 'space-between', // Căn đều nội dung giữa tiêu đề và input
    alignItems: 'center', // Căn giữa chiều dọc
    marginTop: 50,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switch: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
  },
  switchOn: {
    backgroundColor: 'green',
  },
  switchOff: {
    backgroundColor: 'gray',
  },
  switchText: {
    color: 'white',
  },
  productImage: {
    width: '50%',
    height: '50%',
    borderRadius: 0,
    alignSelf: 'center',
    marginBottom: 16,
  },
  saveButton: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonInactive: {
    backgroundColor: 'gray',
  },
  saveButtonActive: {
    backgroundColor: 'green',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 0,
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 1,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ProductDetailScreen;
