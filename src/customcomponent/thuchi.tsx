import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface Props {
  type: 'thu' | 'chi'; // Loại giao dịch
  onClose: () => void;
  onConfirm: () => void;
  styles?: StyleProp<ViewStyle>;
}

const TransactionForm = ({ type, onClose, onConfirm, styles }: Props) => {
  // Màu sắc tùy thuộc vào loại giao dịch
  const isIncome = type === 'thu';
  const confirmButtonStyle = isIncome ? stylesContainer.confirmButtonIncome : stylesContainer.confirmButtonExpense;
  const confirmButtonTextStyle = isIncome ? stylesContainer.confirmButtonTextIncome : stylesContainer.confirmButtonTextExpense;

  return (
    <View style={[stylesContainer.container, styles]}>
      <View style={stylesContainer.modal}>
        <Text style={stylesContainer.title}>
          {isIncome ? 'Tạo phiếu thu' : 'Tạo phiếu chi'}
        </Text>
        
        {/* Input số tiền */}
        <TextInput
          placeholder="Số tiền"
          style={stylesContainer.input}
          keyboardType="numeric"
        />
        
        {/* Input ghi chú */}
        <TextInput
          placeholder="Ghi chú"
          style={[stylesContainer.input, stylesContainer.textArea]}
          multiline={true}
          numberOfLines={4}
        />
        
        <View style={stylesContainer.buttonContainer}>
          <TouchableOpacity style={stylesContainer.closeButton} onPress={onClose}>
            <Text style={stylesContainer.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[confirmButtonStyle]} onPress={onConfirm}>
            <Text style={[confirmButtonTextStyle]}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
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
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Để ghi chú bắt đầu từ trên
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#5c5c5c',
    fontWeight: '500',
  },
  // Style nút "Xác nhận" cho phiếu thu
  confirmButtonIncome: {
    flex: 1,
    padding: 15,
    backgroundColor: '#e6f7e6', // Màu nền xanh nhạt
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonTextIncome: {
    fontSize: 16,
    color: '#4CAF50', // Màu xanh đậm cho văn bản
    fontWeight: '500',
  },
  // Style nút "Xác nhận" cho phiếu chi
  confirmButtonExpense: {
    flex: 1,
    padding: 15,
    backgroundColor: '#ffe6e6', // Màu nền đỏ nhạt
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonTextExpense: {
    fontSize: 16,
    color: '#FF6347', // Màu đỏ cho văn bản
    fontWeight: '500',
  },
});

export default TransactionForm;
