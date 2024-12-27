import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import RNPrint from 'react-native-print';
import {UserLogin} from '../../navigation/CustomDrawer';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

export default function InHoaDon({route}) {
  const navigation = useNavigation(); // Initialize navigation
  const {hoaDon, chiTietHoaDons, totalFinalBill} = route.params; // Receive data from params
  const user: UserLogin = useSelector((state: RootState) => state.user);

  console.log('Thông tin hóa đơn: ', hoaDon);
  console.log('Chi tiết hóa đơn', chiTietHoaDons);
  console.log('Giá bill', totalFinalBill);

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1 style="text-align: center;">Hóa đơn thanh toán</h1>
        <h3 style="text-align: center;">TCE_Restaurant</h3>
        <p style="text-align: center;">Bàn: ${hoaDon.id_ban || 'N/A'} - ${
        hoaDon.tenBan || 'N/A'
      }</p>
        <p style="text-align: center;">Thời gian: ${new Date(
          hoaDon.thoiGianVao,
        ).toLocaleString('vi-VN')}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px; background-color: #f2f2f2;">Món</th>
              <th style="border: 1px solid #000; padding: 8px; background-color: #f2f2f2;">SL</th>
              <th style="border: 1px solid #000; padding: 8px; background-color: #f2f2f2;">Đơn Giá</th>
              <th style="border: 1px solid #000; padding: 8px; background-color: #f2f2f2;">T.Tiền</th>
            </tr>
          </thead>
          <tbody>
            ${chiTietHoaDons
              .map(
                item => `
              <tr>
                <td style="border: 1px solid #000; padding: 8px;">${
                  item.monAn.tenMon
                }</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: center;">${
                  item.soLuongMon
                }</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: right;">${item.monAn.giaMonAn.toLocaleString(
                  'vi-VN',
                )} đ</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: right;">${item.giaTien.toLocaleString(
                  'vi-VN',
                )} đ</td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>
        <p style="text-align: right; font-size: 18px; margin-top: 10px;">Giảm giá: -${(
          hoaDon.tienGiamGia || 0
        ).toLocaleString('vi-VN')} đ</p>
        <p style="text-align: right; font-size: 20px; font-weight: bold;">Tổng: ${totalFinalBill.toLocaleString(
          'vi-VN',
        )} đ</p>
        <p style="text-align: center; margin-top: 30px;">Chúc quý khách vui vẻ, hẹn gặp lại!</p>
      `;

      await RNPrint.print({html: htmlContent});
    } catch (error) {
      console.error('Failed to print', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Hóa đơn thanh toán</Text>

      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>
          Nhà hàng: {user.id_nhaHang.tenNhaHang}
        </Text>
        <Text style={styles.restaurantName}>
          Địa chỉ quán: {user.id_nhaHang.diaChi}
        </Text>
        <Text style={styles.restaurantName}>
          Thông tin liên hệ: {user.id_nhaHang.soDienThoai}
        </Text>
      </View>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderTextB}>Món</Text>
        <Text style={styles.tableHeaderTextN}>SL</Text>
        <Text style={styles.tableHeaderTextN}>Đơn Giá</Text>
        <Text style={styles.tableHeaderTextB}>T.Tiền</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={chiTietHoaDons}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCellB}>{item.monAn.tenMon}</Text>
            <Text style={styles.tableCellN}>{item.soLuongMon}</Text>
            <Text style={styles.tableCellN}>
              {item.monAn.giaMonAn.toLocaleString('vi-VN')} đ
            </Text>
            <Text style={styles.tableCellB}>
              {item.giaTien.toLocaleString('vi-VN')} đ
            </Text>
          </View>
        )}
      />

      {/* Discount Row */}
      <View style={styles.discountRow}>
        <Text style={styles.discountLabel}>Giảm giá:</Text>
        <Text style={styles.discountValue}>
          -{(hoaDon.tienGiamGia || 0).toLocaleString('vi-VN')} đ
        </Text>
      </View>

      {/* Total Row */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Tổng sau giảm giá:</Text>
        <Text style={styles.totalValue}>
          {totalFinalBill.toLocaleString('vi-VN')} đ
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Chúc quý khách vui vẻ, hẹn gặp lại</Text>

      {/* Print Button */}
      <View style={styles.printButtonContainer}>
        <Button title="In hóa đơn" onPress={handlePrint} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},

  // Back Button Styles
  backButton: {
    marginBottom: 10,
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF', // iOS default blue color
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  restaurantInfo: {alignItems: 'center', marginVertical: 8},
  restaurantName: {fontWeight: 'bold', color: '#000', fontSize: 16},

  // Table Header Styles
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 8,
    marginTop: 10,
  },
  tableHeaderTextB: {
    width: '30%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  tableHeaderTextN: {
    width: '20%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },

  // Table Row Styles
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  tableCellB: {
    width: '30%',
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  tableCellN: {
    width: '20%',
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },

  // Discount Row Styles
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
  },
  discountLabel: {fontSize: 16, fontWeight: 'bold', color: 'red'},
  discountValue: {fontSize: 16, fontWeight: 'bold', color: 'red'},

  // Total Row Styles
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  totalLabel: {fontSize: 18, fontWeight: 'bold', color: '#000'},
  totalValue: {fontSize: 18, fontWeight: 'bold', color: '#000'},

  // Footer Styles
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    fontSize: 18,
    color: '#000',
  },

  // Print Button Container
  printButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
});
