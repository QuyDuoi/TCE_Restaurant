import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

function ModalChucNangKhuVuc({
  modalLuaChon,
  setModalLuaChon,
}: {
  modalLuaChon: boolean;
  setModalLuaChon: (val: boolean) => void;
}): React.JSX.Element {
  return (
    <Modal
      visible={modalLuaChon}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalLuaChon(false)}>
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={() => setModalLuaChon(false)}
      />
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.modalButton}>
            <Text style={styles.textButImage}>Thêm khu vực</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.modalButton}>
            <Text style={styles.textButImage}>Thêm bàn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.modalButton}>
            <Text style={styles.textButImage}>Đặt lịch hẹn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModalChucNangKhuVuc;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đây là phần làm nền mờ
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
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
  textButImage: {
    fontSize: 18,
  },
});
