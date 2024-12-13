import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {capNhatBanThunk, themBanThunk} from '../../../store/Thunks/banThunks';
import Ban from '../../../services/models/BanModel';
import {styles} from '../StyleThemSuaBan';

interface ModalThemSuaBanProps {
  visible: boolean;
  onClose: () => void;
  banData?: Ban; // Dữ liệu bàn để cập nhật (nếu có)
  onActionComplete: (success: boolean, message: string) => void;
}

const ModalThemSuaBan: React.FC<ModalThemSuaBanProps> = ({
  visible,
  onClose,
  banData,
  onActionComplete,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const khuVucOptions = khuVucs.map(khuVuc => ({
    label: khuVuc.tenKhuVuc,
    value: khuVuc._id,
  }));

  const [thongTinBan, setThongTinBan] = useState<Ban>(
    new Ban('', '', 'Trống', '', ''),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Ban, string>>>({});

  useEffect(() => {
    if (banData) {
      setThongTinBan({
        ...banData,
        sucChua: banData.sucChua ? String(banData.sucChua) : '', // Chuyển thành string
      });
    } else {
      setThongTinBan(new Ban('', '', 'Trống', '', ''));
    }
  }, [banData]);

  const capNhatDuLieu = (field: keyof Ban, value: any) => {
    setThongTinBan(prev => ({...prev, [field]: value}));
  };

  const handleValidation = () => {
    const newErrors: Partial<Record<keyof Ban, string>> = {};
    if (!thongTinBan.tenBan) newErrors.tenBan = 'Tên bàn không được bỏ trống';
    if (!thongTinBan.sucChua || Number(thongTinBan.sucChua) <= 0)
      newErrors.sucChua = 'Sức chứa không hợp lệ';
    if (!thongTinBan.id_khuVuc)
      newErrors.id_khuVuc = 'Khu vực không được bỏ trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (handleValidation()) {
      try {
        if (banData) {
          await dispatch(
            capNhatBanThunk({id: thongTinBan._id, thongTinBan}),
          ).unwrap();
          setThongTinBan(new Ban('', '', 'Trống', '', ''));
          onActionComplete(true, 'Cập nhật bàn thành công!');
        } else {
          await dispatch(themBanThunk(thongTinBan)).unwrap();
          setThongTinBan(new Ban('', '', 'Trống', '', ''));
          onActionComplete(true, 'Thêm bàn mới thành công!');
        }
        onClose();
      } catch (error: any) {
        Alert.alert('Lỗi', error);
        onActionComplete(false, error);
      }
    } else {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra thông tin');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {banData ? 'Cập nhật bàn' : 'Thêm bàn mới'}
          </Text>

          {/* Khu vực */}
          <Text style={styles.label}>
            Khu vực <Text style={styles.required}>*</Text>
          </Text>
          <Dropdown
            data={khuVucOptions}
            style={[styles.input, errors.id_khuVuc && styles.errorBorder]}
            labelField="label"
            valueField="value"
            placeholder="Chọn khu vực"
            value={thongTinBan.id_khuVuc}
            onChange={item => capNhatDuLieu('id_khuVuc', item.value)}
          />
          {errors.id_khuVuc && (
            <Text style={styles.errorText}>{errors.id_khuVuc}</Text>
          )}

          {/* Tên bàn và Sức chứa trong cùng một View */}
          <View style={styles.row}>
            {/* Tên bàn */}
            <View style={styles.column}>
              <Text style={styles.label}>
                Tên bàn <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.tenBan && styles.errorBorder]}
                placeholder="Nhập tên bàn"
                value={thongTinBan.tenBan}
                onChangeText={text => capNhatDuLieu('tenBan', text)}
              />
              {errors.tenBan && (
                <Text style={styles.errorText}>{errors.tenBan}</Text>
              )}
            </View>

            {/* Sức chứa */}
            <View style={styles.column}>
              <Text style={styles.label}>
                Sức chứa <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.sucChua && styles.errorBorder]}
                placeholder="Nhập sức chứa"
                value={thongTinBan.sucChua}
                keyboardType="numeric"
                onChangeText={text => capNhatDuLieu('sucChua', Number(text))}
              />
              {errors.sucChua && (
                <Text style={styles.errorText}>{errors.sucChua}</Text>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                if (!banData) {
                  setThongTinBan(new Ban('', '', 'Trống', '', ''));
                } // Đặt lại thông tin bàn
                setErrors({}); // Đặt lại lỗi
                onClose(); // Đóng modal
              }}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
              <Text style={styles.confirmButtonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalThemSuaBan;
