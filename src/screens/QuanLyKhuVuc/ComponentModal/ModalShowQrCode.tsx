import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import React from 'react';

interface ShowQrCode {
  maQRCode?: string;
  visible: boolean;
  onClose: () => void;
}

function ModalShowQrCode(props: ShowQrCode): React.JSX.Element {
  const {maQRCode, visible, onClose} = props;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      {/* Vùng nền xám */}
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* Nội dung Modal */}
        <View style={styles.container} pointerEvents="box-none">
          <Image
            style={styles.anhQr}
            source={
              maQRCode ? {uri: maQRCode} : require('../../../image/QRCode.jpg')
            }
          />
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.text}>Tải ảnh về máy</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

export default ModalShowQrCode;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền vùng ngoài
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  anhQr: {
    width: 270,
    height: 270,
    backgroundColor: 'blue',
  },
  button: {
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
