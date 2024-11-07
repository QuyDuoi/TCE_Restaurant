import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, StyleProp, ViewStyle } from 'react-native';

interface Props {
  booking: {
    tableNumber: number;
    floor: number;
    customerName: string;
    date: string;
    time: string;
    note: string; 
  };
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  styles?: StyleProp<ViewStyle>;
}

const TableBookingDetail = ({ booking, visible, onClose, onEdit, styles }: Props) => {
  if (!booking) {
    return null; // Kiểm tra nếu dữ liệu không tồn tại
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={[stylesContainer.container, styles]}>
        <View style={stylesContainer.modal}>
          <Text style={stylesContainer.title}>Chi tiết đặt bàn</Text>
          <Text style={stylesContainer.subTitle}>{`Bàn ${booking.tableNumber || 'N/A'} tầng ${booking.floor || 'N/A'}`}</Text>
          <Text style={stylesContainer.note}>
            {`Ghi chú: ${booking.customerName || 'Không có thông tin'},\n${booking.date || 'Không có ngày'}, ${booking.time || 'Không có giờ'}, ${booking.note || 'Không có ghi chú'}`} {/* Hiển thị ghi chú */}
          </Text>
          <View style={stylesContainer.buttonContainer}>
            <TouchableOpacity style={stylesContainer.closeButton} onPress={onClose}>
              <Text style={stylesContainer.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesContainer.confirmButton} onPress={onEdit}>
              <Text style={stylesContainer.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  note: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    height:45,
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
    marginLeft:15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  confirmButton: {
    flex: 1,
    height:40,
    padding: 10,
    backgroundColor: '#ffede7',
    borderRadius: 5,
    marginLeft: 10,
    marginRight:15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#5c5c5c',
    fontWeight: '500',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#ff6b35',
    fontWeight: '500',
  },
});

export default TableBookingDetail;
