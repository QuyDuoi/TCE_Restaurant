import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import React from 'react';
import RNPrint from 'react-native-print';

export default function InHoaDon({ route }) {
  const { hoaDon, chiTietHoaDons, totalFinalBill } = route.params; // Nhận dữ liệu từ params

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1 style="text-align: center;">Phiếu thanh toán</h1>
        <h3 style="text-align: center;">TCE_Restaurant</h3>
        <p style="text-align: center;">Bàn: ${hoaDon.id_ban || 'N/A'} - ${
        hoaDon.tenBan || 'N/A'
      }</p>
        <p style="text-align: center;">Thời gian: ${new Date(
          hoaDon.thoiGianVao
        ).toLocaleString('vi-VN')}</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px;">Món</th>
              <th style="border: 1px solid #000; padding: 8px;">SL</th>
              <th style="border: 1px solid #000; padding: 8px;">Đơn Giá</th>
              <th style="border: 1px solid #000; padding: 8px;">T.Tiền</th>
            </tr>
          </thead>
          <tbody>
            ${chiTietHoaDons.map((item) => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${item.id_monAn.tenMon}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.soLuongMon}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${(item.giaTien / item.soLuongMon).toLocaleString()}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${item.giaTien.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="text-align: right; font-size: 18px;">Giảm giá: -${(hoaDon.tienGiamGia || 0).toLocaleString()} đ</p>
        <p style="text-align: right; font-size: 18px;">Tổng: ${totalFinalBill.toLocaleString()} đ</p>
        <p style="text-align: center;">Chúc quý khách vui vẻ, hẹn gặp lại!</p>
      `;

      await RNPrint.print({ html: htmlContent });
    } catch (error) {
      console.error('Failed to print', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Phiếu thanh toán</Text>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>TCE_Restaurant</Text>
        <Text style={styles.restaurantName}>Địa chỉ quán</Text>
        <Text style={styles.restaurantName}>Thông tin liên hệ</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Món</Text>
        <Text style={styles.tableHeaderText}>SL</Text>
        <Text style={styles.tableHeaderText}>D.Giá</Text>
        <Text style={styles.tableHeaderText}>T.Tiền</Text>
      </View>
      <FlatList
        data={chiTietHoaDons}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.id_monAn.tenMon}</Text>
            <Text style={styles.tableCell}>{item.soLuongMon}</Text>
            <Text style={styles.tableCell}>
              {(item.giaTien / item.soLuongMon).toLocaleString()}
            </Text>
            <Text style={styles.tableCell}>{item.giaTien.toLocaleString()}</Text>
          </View>
        )}
      />
      <View style={styles.discountRow}>
        <Text style={styles.discountLabel}>Giảm giá:</Text>
        <Text style={styles.discountValue}>
          -{(hoaDon.tienGiamGia || 0).toLocaleString()} đ
        </Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Tổng sau giảm giá:</Text>
        <Text style={styles.totalValue}>
          {totalFinalBill.toLocaleString()} đ
        </Text>
      </View>
      <Text style={styles.footer}>Chúc quý khách vui vẻ, hẹn gặp lại</Text>
      <Button title="In hóa đơn" onPress={handlePrint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#000' },
  restaurantInfo: { alignItems: 'center', marginVertical: 8 },
  restaurantName: { fontWeight: 'bold', color: '#000' },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  tableHeaderText: { flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#000' },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tableCell: { flex: 1, textAlign: 'center', color: '#000' },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
  },
  discountLabel: { fontSize: 16, fontWeight: 'bold', color: 'red' },
  discountValue: { fontSize: 16, fontWeight: 'bold', color: 'red' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  footer: { textAlign: 'center', fontStyle: 'italic', marginTop: 8, fontSize: 20 },
});

