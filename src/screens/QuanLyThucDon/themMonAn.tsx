import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import MonAn from '../../services/models/MonAnModel';
import CustomModalChoiseCamera from '../../customcomponent/customModalChoiseCamera';
import {
  openCamera,
  openImageLibrary,
} from '../../respositorys/CameraRespository';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {Dropdown} from 'react-native-element-dropdown';
import {taoFormDataMonAn} from './ThucDonRespository';
import {themMonAnMoi} from '../../store/Thunks/monAnThunks';
import {styles} from './ThemSuaStyle';
import {useToast} from '../../customcomponent/CustomToast';

function ManThemMonAn(): React.JSX.Element {
  const {showToast} = useToast();
  const [monAnMoi, setMonAnMoi] = useState<MonAn>(
    new MonAn('', '', '', 0, true, ''),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof MonAn, string>>>(
    {},
  ); // State quản lý lỗi
  const [modalVisible, setModalVisible] = useState(false);
  const dsDanhMuc = useSelector((state: RootState) => state.danhMuc.danhMucs);
  const dispatch = useDispatch<AppDispatch>();
  const danhMucOptions = dsDanhMuc.map(
    (danhMuc: {_id: string; tenDanhMuc: string}) => ({
      label: danhMuc.tenDanhMuc,
      value: danhMuc._id,
    }),
  );

  // Cập nhật giá trị cho từng trường của món ăn
  const capNhatDuLieu = (field: keyof MonAn, value: string | number) => {
    setMonAnMoi(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Hàm xác thực thông tin các trường bắt buộc
  const handleValidation = () => {
    const newErrors: Partial<Record<keyof MonAn, string>> = {};

    if (!monAnMoi.anhMonAn) newErrors.anhMonAn = 'Vui lòng tải ảnh món ăn';
    if (!monAnMoi.tenMon) newErrors.tenMon = 'Tên món không được bỏ trống';
    if (!monAnMoi.giaMonAn || monAnMoi.giaMonAn <= 0)
      newErrors.giaMonAn = 'Giá món ăn không hợp lệ';
    if (!monAnMoi.id_danhMuc)
      newErrors.id_danhMuc = 'Danh mục không được bỏ trống';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  // Hàm xử lý khi nhấn "Lưu"
  const handleSave = () => {
    if (handleValidation()) {
      const formData = taoFormDataMonAn(monAnMoi);
      dispatch(themMonAnMoi(formData))
        .unwrap()
        .then(() => {
          showToast('check', 'Thêm món ăn mới thành công', 'green', 1500);
        })
        .catch(error => {
          showToast('remove', error.message, 'white', 2000);
        });
      Alert.alert('Thành công', 'Món ăn đã được thêm');
      // Logic thêm món ăn vào database hoặc xử lý thêm món ăn
    } else {
      showToast('remove', 'Vui lòng kiểm tra lại thông tin', 'white', 2000);
    }
  };

  const handleOpenCamera = async () => {
    const uri = await openCamera();
    if (uri) {
      console.log('Ảnh được chụp: ', uri);
      setMonAnMoi(prevState => ({
        ...prevState,
        anhMonAn: uri, // Lưu đường dẫn ảnh vào state
      }));
    }
    setModalVisible(false);
  };

  const handleOpenImageLibrary = async () => {
    const uri = await openImageLibrary();
    if (uri) {
      console.log('Ảnh được chọn: ', uri);
      setMonAnMoi(prevState => ({
        ...prevState,
        anhMonAn: uri, // Lưu đường dẫn ảnh vào state
      }));
    }
    setModalVisible(false);
  };

  const handleEditImage = () => {
    setModalVisible(true); // Mở modal cho việc sửa ảnh
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageSection}>
          <View style={styles.imageTittle}>
            <Text style={styles.sectionTitle}>
              Hình Ảnh <Text style={styles.required}>*</Text>
            </Text>
            <Text style={styles.imageDescription}>
              Ảnh món ăn cần được chụp rõ nét và thực tế để khách hàng xem và
              lựa chọn
            </Text>
          </View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleEditImage}>
            {monAnMoi.anhMonAn ? (
              <View>
                <Image
                  source={{uri: monAnMoi.anhMonAn}}
                  style={styles.uploadedImage}
                />
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>Sửa</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.uploadButtonText}>Tải ảnh mô tả</Text>
            )}
          </TouchableOpacity>
        </View>
        {errors.anhMonAn && (
          <Text style={styles.errorText}>{errors.anhMonAn}</Text>
        )}

        {/* Danh mục */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Danh mục <Text style={styles.required}>*</Text>
          </Text>
          <Dropdown
            style={[styles.dropdown, errors.id_danhMuc && styles.errorBorder]}
            data={danhMucOptions}
            labelField="label"
            valueField="value"
            placeholder="Chọn danh mục"
            value={monAnMoi.id_danhMuc}
            onChange={item => capNhatDuLieu('id_danhMuc', item.value)}
          />
        </View>
        {errors.id_danhMuc && (
          <Text style={styles.errorText}>{errors.id_danhMuc}</Text>
        )}

        {/* Tên Món */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Tên món <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.tenMon && styles.errorBorder]}
            placeholder="VD: Khoai tây chiên"
            onChangeText={text => capNhatDuLieu('tenMon', text)}
          />
        </View>
        {errors.tenMon && <Text style={styles.errorText}>{errors.tenMon}</Text>}

        {/* Giá */}
        <View style={styles.row}>
          <Text style={styles.label}>
            Giá món <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              {textAlign: 'right'},
              errors.giaMonAn && styles.errorBorder,
            ]}
            placeholder="đ"
            keyboardType="numeric"
            onChangeText={text => capNhatDuLieu('giaMonAn', Number(text))}
          />
        </View>
        {errors.giaMonAn && (
          <Text style={styles.errorText}>{errors.giaMonAn}</Text>
        )}

        {/* Mô tả */}
        <View style={styles.rowMoTa}>
          <Text style={styles.labelMoTa}>Mô tả</Text>
          <TextInput
            style={styles.inputMoTa}
            placeholder="VD: Cà chua + Khoai tây chiên + Tương ớt"
            onChangeText={text => capNhatDuLieu('moTa', text)}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>

      <CustomModalChoiseCamera
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onOpenCamera={handleOpenCamera}
        onOpenLibrary={handleOpenImageLibrary}
      />
    </View>
  );
}

export default ManThemMonAn;
