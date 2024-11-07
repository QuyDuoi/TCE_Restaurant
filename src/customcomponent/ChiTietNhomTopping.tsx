import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Topping {
  id: number;
  name: string;
  price: number;
  enabled: boolean;
}

const ToppingDetailScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [select, setSelected] = useState('Cơm');
  const [toppings, setToppings] = useState<Topping[]>([
    { id: 1, name: 'Lau thai Tomyum', price: 0, enabled: true },
    { id: 2, name: 'Lau thao moc thanh dam', price: 0, enabled: true },
  ]);

  const handleToggleSwitch = (id: number) => {
    setToppings((prevToppings) =>
      prevToppings.map((topping) =>
        topping.id === id ? { ...topping, enabled: !topping.enabled } : topping
      )
    );
  };

  const handleAddTopping = () => {
    const newTopping: Topping = {
      id: toppings.length + 1,
      name: 'Topping mới',
      price: 0,
      enabled: true,
    };
    setToppings([...toppings, newTopping]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết nhóm Topping</Text>
      </View>

      {/* Tên nhóm và nút chọn nước dùng */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Tên*"
          value={groupName}
          onChangeText={setGroupName}
        />
        <TextInput style={styles.dropdownButton}>
          <Text style={styles.dropdownText}>{select}</Text>
        </TextInput>
      </View>

      {/* Món thêm và vị trí */}
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Món thêm</Text>
        <TouchableOpacity style={styles.positionButton}>
          <Text style={styles.positionText}>Vị trí</Text>
          <Icon name="sort" size={20} color="red" />
        </TouchableOpacity>
      </View>

      {/* Danh sách món thêm */}
      {toppings.map((topping) => (
        <View key={topping.id} style={styles.toppingRow}>
          <View>
            <Text>{topping.name}</Text>
            <Text>{topping.price} đ</Text>
          </View>
          <Switch
            value={topping.enabled}
            onValueChange={() => handleToggleSwitch(topping.id)}
          />
        </View>
      ))}

      {/* Button Thêm Topping */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTopping}>
        <Text style={styles.addButtonText}>+ Thêm Topping</Text>
      </TouchableOpacity>

      {/* Liên kết món đã liên kết */}
      <TouchableOpacity style={styles.row}>
        <Text>Món đã liên kết</Text>
        <Icon name="keyboard-arrow-right" size={24} color="#999" />
      </TouchableOpacity>

      {/* Chọn nước lẩu */}
      <TouchableOpacity style={styles.row}>
        <Text>Nước lẩu</Text>
        <Text style={styles.rightArrow}>Set lau chay</Text>
        <Icon name="keyboard-arrow-right" size={24} color="#999" />
      </TouchableOpacity>

      {/* Xóa nhóm Topping */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Xóa nhóm Topping</Text>
      </TouchableOpacity>

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    width:"100%",
    paddingRight:140,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  dropdownButton: {
    marginLeft:-150,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    // color: 'red',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  positionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionText: {
    fontSize: 16,
    color: 'red',
    marginRight: 5,
  },
  toppingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#ff6b35',
    fontSize: 16,
  },
  rightArrow: {
    fontSize: 16,
    color: '#999',
  },
  deleteButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteButtonText: {
    color: '#ff6347',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#ffede7',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#ff6b35',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ToppingDetailScreen;
