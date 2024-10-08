import React, { useState } from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import { colors } from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import DatBanModal from './DatBanModal'; // Import modal đặt bàn

interface ModalComponentProps {
  isVisible: boolean;
  onClose: () => void;
  selectedBan: string | null;
}

const ModalComponent = ({ isVisible, onClose, selectedBan }: ModalComponentProps) => {
  const [isDatBanVisible, setIsDatBanVisible] = useState(false); // Quản lý trạng thái của modal đặt bàn
  const [showAlert, setShowAlert] = useState(false); // Quản lý trạng thái hiển thị thông báo
  const [isSuccess, setIsSuccess] = useState(false); // Trạng thái thành công hay thất bại
  const [alertMessage, setAlertMessage] = useState(''); // Thông báo cần hiển thị

  const handleDatBan = (hoTen: string, soDienThoai: string) => {
    // Giả sử đây là logic kiểm tra thành công/không thành công
    const success = Math.random() > 0.5; // Giả lập 50% thành công và 50% thất bại
    setIsSuccess(success);
    setAlertMessage(
      `Quý khách ${hoTen} đặt bàn ${selectedBan} ${success ? 'Thành công' : 'Không thành công'}`
    );
    setShowAlert(true); // Hiển thị thông báo
  };


  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <TitleComponent
                text="Lựa chọn chức năng"
                size={18}
                styles={styles.title}
              />
              <SpaceComponent height={13} />
              <SectionComponent>
                <ButtonComponent
                  title="Đặt bàn"
                  onPress={() => setIsDatBanVisible(true)} // Hiển thị modal đặt bàn khi bấm nút "Đặt bàn"
                  bgrColor={colors.orange}
                  titleColor={colors.white}
                  styles={styles.button}
                  boderRadius={100}
                />
              </SectionComponent>
              <SectionComponent>
                <ButtonComponent
                  title="Tạo hóa đơn"
                  onPress={() => {}}
                  bgrColor={colors.orange}
                  titleColor={colors.white}
                  styles={styles.button}
                  boderRadius={100}
                />
              </SectionComponent>
              <SectionComponent>
                <ButtonComponent
                  title="Xem thông tin hóa đơn"
                  onPress={() => {}}
                  bgrColor={colors.orange}
                  titleColor={colors.white}
                  styles={styles.button}
                  boderRadius={100}
                />
              </SectionComponent>
              <SectionComponent>
                <ButtonComponent
                  title="Xem thông tin bàn đặt"
                  onPress={() => {}}
                  bgrColor={colors.orange}
                  titleColor={colors.white}
                  styles={styles.button}
                  boderRadius={100}
                />
              </SectionComponent>
              <SpaceComponent height={24} />
              <SectionComponent>
                <ButtonComponent
                  title="Quay lại"
                  onPress={onClose}
                  bgrColor={colors.white}
                  titleColor={colors.black}
                  boederWidth={2}
                  borderColor={colors.black}
                  styles={styles.buttonClose}
                  boderRadius={100}
                />
              </SectionComponent>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

      {/* Modal đặt bàn */}
      <DatBanModal
        isVisible={isDatBanVisible}
        onClose={() => setIsDatBanVisible(false)}
        onConfirm={handleDatBan} // Gửi thông tin đặt bàn khi người dùng xác nhận
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 5,
  },
  title: {
    alignSelf: 'center',
    padding: 5,
    marginTop: 5,
  },
  button: {
    height: 45,
  },
  buttonClose: {
    height: 45,
    marginBottom: 3,
  },
});

export default ModalComponent;
