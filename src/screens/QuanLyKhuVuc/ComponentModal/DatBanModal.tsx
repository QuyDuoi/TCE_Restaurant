import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent'; // Điều chỉnh đường dẫn import theo cấu trúc project của bạn
import { colors } from '../../QuanLyThucDon/Hoa/contants/hoaColors'; // Điều chỉnh đường dẫn import theo cấu trúc project của bạn

interface DatBanModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (hoTen: string, soDienThoai: string) => void;
}

const DatBanModal = ({ isVisible, onClose, onConfirm }: DatBanModalProps) => {
  const [hoTen, setHoTen] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');

  const handleConfirm = () => {
    if (hoTen.trim() && soDienThoai.trim()) {
      onConfirm(hoTen, soDienThoai);
      onClose(); // Đóng modal sau khi xác nhận
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Đặt bàn</Text>
          <TextInput
            placeholder="Họ tên"
            value={hoTen}
            onChangeText={setHoTen}
            style={styles.input}
          />
          <TextInput
            placeholder="Số điện thoại"
            value={soDienThoai}
            onChangeText={setSoDienThoai}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <ButtonComponent
              title="Xác nhận"
              onPress={handleConfirm}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
            />
            <ButtonComponent
              title="Hủy"
              onPress={onClose}
              bgrColor={colors.gray}
              titleColor={colors.white}
              styles={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginBottom: 10,
    paddingVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default DatBanModal;
