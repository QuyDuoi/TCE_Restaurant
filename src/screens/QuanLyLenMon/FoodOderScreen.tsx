import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import { FoodOrder, sampleFoodOrders } from './FoodOderData';

const { width, height } = Dimensions.get('window');

const FoodOrderItem: React.FC<{ order: FoodOrder; onToggleStatus: (id: number) => void; onDetailPress: (id: number) => void }> = ({ order, onToggleStatus, onDetailPress }) => {
  return (
    <View style={[styles.orderContainer, order.status ? styles.completed : styles.pending]}>
      <Image source={{ uri: order.imageUrl }} style={styles.foodImage} />
      <View style={styles.orderInfo}>
        <Text style={styles.foodName}>{order.name}</Text>
        <Text style={styles.quantity}>Số lượng: {order.quantity}</Text>
      </View>
      <View style={styles.orderActions}>
        <TouchableOpacity onPress={() => onDetailPress(order.id)}>
          <Text style={styles.areaText}>Khu vực: <Text style={styles.detailLink}>Xem chi tiết</Text></Text>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          <CheckBox
            isChecked={order.status}
            onClick={() => onToggleStatus(order.id)}
            checkedCheckBoxColor="#33cc33"
            uncheckedCheckBoxColor="#ff4d4d"
          />
          <Text style={order.status ? styles.statusTextCompleted : styles.statusTextPending}>
            {order.status ? 'Hoàn thành' : 'Chưa hoàn thành'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const FoodOrderScreen: React.FC = () => {
  const [orders, setOrders] = useState(sampleFoodOrders);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (id: number) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) =>
        order.id === id ? { ...order, status: !order.status } : order
      );
      return updatedOrders.sort((a, b) => Number(a.status) - Number(b.status));
    });
  };

  const handleDetailPress = (id: number) => {
    // Xử lý sự kiện "Xem chi tiết" cho món ăn với id tương ứng
    console.log("Xem chi tiết món ăn với ID:", id);
  };

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Quản lý lên món</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm món ăn"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredOrders.map((order) => (
          <FoodOrderItem key={order.id} order={order} onToggleStatus={toggleStatus} onDetailPress={handleDetailPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: width * 0.04,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#ff7f50',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  searchInput: {
    height: height * 0.07,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  scrollView: {
    paddingBottom: height * 0.02,
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pending: {
    backgroundColor: '#ffe6e6',
  },
  completed: {
    backgroundColor: '#ccffcc',
  },
  foodImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 8,
    marginRight: width * 0.03,
  },
  orderInfo: {
    flex: 3,
  },
  foodName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: width * 0.035,
    color: '#ff7f50',
    marginTop: 4,
  },
  orderActions: {
    flex: 2.5,
    alignItems: 'flex-end',
  },
  areaText: {
    fontSize: width * 0.03,
    color: '#333',
  },
  detailLink: {
    color: '#4da6ff',
    textDecorationLine: 'underline',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  statusTextPending: {
    color: '#ff4d4d',
    fontSize: width * 0.03,
    marginLeft: 5,
  },
  statusTextCompleted: {
    color: '#33cc33',
    fontSize: width * 0.03,
    marginRight: 10,
    marginLeft: 20,
  },
});
