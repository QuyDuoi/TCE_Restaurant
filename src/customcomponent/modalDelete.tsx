import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';

interface ModalXoaBanProps {
  visible: boolean;
  title: string;
  content: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeletePostModal: React.FC<ModalXoaBanProps> = ({
  visible,
  title,
  content,
  onDelete,
  onCancel,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <FontAwesomeIcon icon={faTrashCan} size={20} color={'#F04438'} />
            </View>
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{content}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onCancel}>
              <Text style={styles.cancelTextStyle}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonDelete]}
              onPress={onDelete}>
              <Text style={styles.deleteTextStyle}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    alignItems: 'flex-start', // Chuyển toàn bộ căn lề trái
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
    backgroundColor: '#FEE4E2', // Màu nền của icon tròn
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
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
  buttonDelete: {
    backgroundColor: '#F04438', // Màu đỏ cho nút delete
  },
  deleteTextStyle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default DeletePostModal;
