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
import {updateMonAnThunk} from '../../store/Thunks/monAnThunks';
import {styles} from './ThemSuaStyle';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {IPV4} from '../../services/api';
import {UserLogin} from '../../navigation/CustomDrawer';

interface Props {
  route: RouteProp<{params: {monAn: MonAn}}, 'params'>;
}

function ManCapNhatMonAn(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<Props['route']>(); // Lấy route từ useRoute
  const user: UserLogin = useSelector(state => state.user);
  const {monAn} = route.params; // Lấy monAn từ route.params
  const [monAnCapNhat, setMonAnCapNhat] = useState<MonAn>(monAn);
  const [errors, setErrors] = useState<Partial<Record<keyof MonAn, string>>>(
    {},
  );
  const [modalVisible, setModalVisible] = useState(false);
  const dsDanhMuc = useSelector((state: RootState) => state.danhMuc.danhMucs);
  const dispatch = useDispatch<AppDispatch>();

  const danhMucOptions = dsDanhMuc.map(
    (danhMuc: {_id: string; tenDanhMuc: string}) => ({
      label: danhMuc.tenDanhMuc,
      value: danhMuc._id,
    }),
  );

  const kiemTraThayDoi = () => {
    return (
      monAnCapNhat.tenMon !== monAn.tenMon ||
      monAnCapNhat.anhMonAn !== monAn.anhMonAn ||
      monAnCapNhat.moTa !== monAn.moTa ||
      monAnCapNhat.giaMonAn !== monAn.giaMonAn ||
      (typeof monAnCapNhat.id_danhMuc === 'object'
        ? monAnCapNhat.id_danhMuc._id
        : monAnCapNhat.id_danhMuc) !==
        (typeof monAn.id_danhMuc === 'object'
          ? monAn.id_danhMuc._id
          : monAn.id_danhMuc) ||
      monAnCapNhat.id_nhomTopping !== monAn.id_nhomTopping
    );
  };

  // Cập nhật giá trị cho từng trường của món ăn
  const capNhatDuLieu = (field: keyof MonAn, value: string | number) => {
    setMonAnCapNhat(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const hinhAnhMon = monAnCapNhat.anhMonAn
    ? monAnCapNhat.anhMonAn.replace('localhost', IPV4) // Thay đổi IP theo cấu hình server
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  // Hàm xác thực thông tin các trường bắt buộc
  const handleValidation = () => {
    const newErrors: Partial<Record<keyof MonAn, string>> = {};

    if (!monAnCapNhat.anhMonAn) newErrors.anhMonAn = 'Vui lòng tải ảnh món ăn';
    if (!monAnCapNhat.tenMon) newErrors.tenMon = 'Tên món không được bỏ trống';
    if (!monAnCapNhat.giaMonAn || monAnCapNhat.giaMonAn <= 0)
      newErrors.giaMonAn = 'Giá món ăn không hợp lệ';
    if (!monAnCapNhat.id_danhMuc)
      newErrors.id_danhMuc = 'Danh mục không được bỏ trống';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý khi nhấn "Cập nhật"
  const handleUpdate = () => {
    if (handleValidation()) {
      const formData = taoFormDataMonAn(monAnCapNhat);
      dispatch(updateMonAnThunk({id: monAnCapNhat._id!, formData}))
        .unwrap()
        .then(() => {
          Alert.alert('Thành công', 'Món ăn đã được cập nhật');
          navigation.goBack();
        })
        .catch(error => {
          console.error('Lỗi cập nhật món ăn: ', error);
          Alert.alert('Lỗi', error.message || 'Có lỗi xảy ra');
        });
    } else {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin');
    }
  };

  const handleOpenCamera = async () => {
    const uri = await openCamera();
    if (uri) {
      setMonAnCapNhat(prevState => ({
        ...prevState,
        anhMonAn: uri,
      }));
    }
    setModalVisible(false);
  };

  const handleOpenImageLibrary = async () => {
    const uri = await openImageLibrary();
    if (uri) {
      setMonAnCapNhat(prevState => ({
        ...prevState,
        anhMonAn: uri,
      }));
    }
    setModalVisible(false);
  };

  const handleEditImage = () => {
    setModalVisible(true);
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
            onPress={handleEditImage}
            disabled={user.vaiTro !== 'Quản lý'}>
            {monAnCapNhat.anhMonAn ? (
              <View>
                <Image
                  source={{uri: hinhAnhMon}}
                  style={styles.uploadedImage}
                />
                {user.vaiTro === 'Quản lý' && ( // Chỉ hiện nút "Sửa" nếu là "Quản lý"
                  <View style={styles.overlay}>
                    <Text style={styles.overlayText}>Sửa</Text>
                  </View>
                )}
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
            value={
              typeof monAnCapNhat.id_danhMuc === 'object'
                ? monAnCapNhat.id_danhMuc._id
                : monAnCapNhat.id_danhMuc
            }
            onChange={item => capNhatDuLieu('id_danhMuc', item.value)}
            disable={user.vaiTro !== 'Quản lý'}
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
            value={monAnCapNhat.tenMon}
            onChangeText={text => capNhatDuLieu('tenMon', text)}
            editable={user.vaiTro === 'Quản lý'}
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
            value={monAnCapNhat.giaMonAn.toString()}
            onChangeText={text => capNhatDuLieu('giaMonAn', Number(text))}
            editable={user.vaiTro === 'Quản lý'}
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
            value={monAnCapNhat.moTa}
            onChangeText={text => capNhatDuLieu('moTa', text)}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            editable={user.vaiTro === 'Quản lý'}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.saveButton,
          {backgroundColor: kiemTraThayDoi() ? '#ff4500' : '#ccc'},
        ]}
        onPress={handleUpdate}
        disabled={!kiemTraThayDoi()}>
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
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

export default ManCapNhatMonAn;
