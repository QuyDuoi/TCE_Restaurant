import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ModalDongCaProps {
  noiDung: string;
  visible: boolean;
  onCancel: () => void;
  onThanhToan: () => void;
  onDongCa: () => void;
}

function ModalDongCa(props: ModalDongCaProps): React.JSX.Element {
  const {noiDung, onThanhToan, onDongCa, visible, onCancel} = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Icon name='close' size={20} color={'gray'}/>
            </TouchableOpacity>
          <Text style={styles.confirm}>Thông báo</Text>
          <Text style={styles.modalTitle}>{noiDung}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onThanhToan}>
              <Text style={styles.cancelTextStyle}>Đến thanh toán</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={onDongCa}>
              <Text style={styles.confirmTextStyle}>Đóng ca</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalDongCa;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Nền tối cho modal
  },
  modalView: {
    width: 320, // Độ rộng của modal
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15, // Độ bo góc
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Đẩy icon close về bên phải
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF7E6', // Màu nền của icon tròn
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '300',
    marginVertical: 10,
    textAlign: 'left',
    color: '#101828',
  },
  modalText: {
    fontSize: 14,
    textAlign: 'left',
    color: '#667085',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  cancelTextStyle: {
    color: '#344054',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonConfirm: {
    backgroundColor: '#7F56D9',
  },
  confirmTextStyle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  confirm: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 20
  }
});
