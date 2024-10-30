import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

interface CustomModalChoiseProps {
  visible: boolean;
  onClose: () => void;
  onOpenCamera: () => void;
  onOpenLibrary: () => void;
  onViewImage?: () => void; // Hành động xem ảnh (tùy chọn)
  showViewImage?: boolean; // Tùy chọn hiển thị nút xem ảnh
}

const CustomModalChoiseCamera: React.FC<CustomModalChoiseProps> = ({
  visible,
  onClose,
  onOpenCamera,
  onOpenLibrary,
  onViewImage,
  showViewImage = false, // Giá trị mặc định là false nếu không truyền vào
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onOpenCamera} style={styles.modalButton}>
            <Text style={styles.textButImage}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpenLibrary} style={styles.modalButton}>
            <Text style={styles.textButImage}>Chọn từ thư viện</Text>
          </TouchableOpacity>
          {showViewImage && onViewImage && (
            <TouchableOpacity onPress={onViewImage} style={styles.modalButton}>
              <Text style={styles.textButImage}>Xem ảnh</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đây là phần làm nền mờ
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
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

export default CustomModalChoiseCamera;
