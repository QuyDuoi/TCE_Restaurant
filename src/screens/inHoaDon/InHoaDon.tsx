import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import React from 'react';
import RNPrint from 'react-native-print';

const data = [
  { id: '1', name: 'Rau muống xào tỏi', quantity: 2, price: 30000, total: 60000 },
  { id: '2', name: 'Rau muống xào tỏi', quantity: 1, price: 30000, total: 30000 },
  { id: '3', name: 'Rau muống xào tỏi', quantity: 1, price: 30000, total: 30000 },
  { id: '4', name: 'Thịt kho tàu chay', quantity: 1, price: 30000, total: 30000 },
  { id: '5', name: 'Mã giảm giá', quantity: '', price: '', total: -10000, discount: true },
];

export default function InHD() {
  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1 style="text-align: center;">Phiếu thanh toán</h1>
        <h3 style="text-align: center;">TCE_Restaurant</h3>
        <p style="text-align: center;">Địa chỉ quán - Thông tin liên hệ</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">Món</th>
              <th style="border: 1px solid #000; padding: 8px;">SL</th>
              <th style="border: 1px solid #000; padding: 8px;">D.Giá</th>
              <th style="border: 1px solid #000; padding: 8px;">T.Tiền</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(item => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.price ? item.price.toLocaleString() : ''}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center; color: ${item.discount };">${item.total.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="text-align: right; font-size: 18px;">Tổng: 140.000đ</p>
        <p style="text-align: center;">Chúc quý khách vui vẻ, hẹn gặp lại</p>
      `;

      await RNPrint.print({ html: htmlContent });
    } catch (error) {
      console.error('Failed to print', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Phiếu thanh toán <Text style={styles.tableInfo}>Bàn 1 - tầng 1</Text></Text>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>TCE_Restaurant</Text>
        <Text>Địa chỉ quán</Text>
        <Text>Thông tin liên hệ</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Món</Text>
        <Text style={styles.tableHeaderText}>SL</Text>
        <Text style={styles.tableHeaderText}>D.Giá</Text>
        <Text style={styles.tableHeaderText}>T.Tiền</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.price ? item.price.toLocaleString() : ''}</Text>
            <Text style={[styles.tableCell, item.discount && styles.discount]}>{item.total.toLocaleString()}</Text>
          </View>
        )}
      />
      <View style={styles.total}>
        <Text style={styles.totalText}>Tổng:</Text>
        <Text style={styles.totalText}>140.000đ</Text>
      </View>
      <Text style={styles.footer}>Chúc quý khách vui vẻ, hẹn gặp lại</Text>
      <Button title="In hóa đơn" onPress={handlePrint} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableInfo: {
    textAlign: 'right',
    color: 'blue',
  },
  restaurantInfo: {
    alignItems: 'center',
    marginVertical: 8,
  },
  restaurantName: {
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 4,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  discount: {
    color: 'red',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    fontSize: 20,
  },
});
