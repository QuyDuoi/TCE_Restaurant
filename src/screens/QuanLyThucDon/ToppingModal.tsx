// ToppingModal.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import styles from './DanhMucStyles'; // Đảm bảo đường dẫn đúng

interface Topping {
  id: number;
  name: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  items: Topping[];
}

interface ToppingModalProps {
  visible: boolean; // Xác định modal có hiện hay không
  selectedCategory: Category;
  isAddingNew: boolean; // Xác định nếu modal đang trong chế độ thêm mới
  topping: Topping;
  toppingName: string; // Tên của ô tô được chọn
  priceTopping: Number; // Giá của ô tô được chọn
  onClose: () => void; // Hàm để đóng modal
  onAddTopping: (name: string, price: number) => void;
}

const ToppingModal: React.FC<ToppingModalProps> = ({
  visible,
  selectedCategory,
  isAddingNew,
  topping,
  toppingName,
  priceTopping,
  onClose,
  onAddTopping,
}) => {
  const [newToppingName, setNewToppingName] = useState('');
  const [newToppingPrice, setNewToppingPrice] = useState('');

  const removeTopping = (toppingId: number) => {
    selectedCategory.items = selectedCategory.items.filter(
      topping => topping.id !== toppingId,
    );
  };

  const controllTopping = () => {
    if (isAddingNew) {
      if (newToppingName.trim() && !isNaN(Number(newToppingPrice))) {
        onAddTopping(newToppingName, parseFloat(newToppingPrice));
        setNewToppingName('');
        setNewToppingPrice('');
        onClose();
      } else {
        Alert.alert('Thông báo', 'Vui lòng nhập tên và giá topping hợp lệ.');
      }
    } else {
      removeTopping(topping.id);
      console.log(topping.id);
      console.log(selectedCategory.id);
      console.log('Đã xóa');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isAddingNew ? 'Thêm mới topping' : 'Chi tiêt topping'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Tên topping"
            value={isAddingNew ? newToppingName : topping.name}
            onChangeText={setNewToppingName}
          />
          <TextInput
            style={styles.input}
            placeholder="Giá topping"
            keyboardType="numeric"
            value={isAddingNew ? newToppingPrice : topping.price.toString()}
            onChangeText={setNewToppingPrice}
          />
          <TouchableOpacity onPress={controllTopping} style={styles.addButton}>
            <Text style={styles.addButtonText}>
              {isAddingNew ? 'Thêm' : 'Xóa'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ToppingModal;
