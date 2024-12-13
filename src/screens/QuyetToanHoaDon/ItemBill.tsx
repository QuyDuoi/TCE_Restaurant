import {Text, TouchableOpacity, View} from 'react-native';
import {HoaDon} from '../../store/Slices/HoaDonSlice';
import {styles} from './BillStyle';

const getTimeDifference = (startTime: string) => {
  const start = new Date(startTime);
  const now = new Date();
  const diff = now.getTime() - start.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60)); // convert milliseconds to hours
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes

  return `${hours} giờ ${minutes} phút`;
};

export const BillItem: React.FC<{
  hoaDon: HoaDon;
  tenKhuVuc: string;
  tenBan: string;
  onDetail: () => void;
  onPayment: () => void;
}> = ({hoaDon, tenKhuVuc, tenBan, onDetail, onPayment}) => {
  const gioVao = hoaDon.thoiGianVao
    ? `${new Date(hoaDon.thoiGianVao).toLocaleTimeString('vi-VN').slice(0, 5)}`
    : 'null';
  return (
    <View style={styles.billContainer}>
      <View style={styles.billInfo}>
        {hoaDon.id_ban ? (
          <View>
            <Text style={styles.billText}>
              <Text style={styles.boldText}>Khu Vực: </Text>
              {`${tenKhuVuc ?? 'Trống'} - Bàn ${tenBan}`}
            </Text>
            <Text style={styles.billText1}>
              <Text style={styles.boldText}>Giờ vào: </Text>
              {gioVao}
            </Text>
            <Text style={styles.durationText}>
              Thời gian:{' '}
              {hoaDon.thoiGianVao
                ? getTimeDifference(hoaDon.thoiGianVao)
                : 'Chưa có thời gian'}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.billText}>Bán mang đi</Text>
          </View>
        )}
        <Text style={styles.totalText}>Tổng tiền: {hoaDon.tongTien}</Text>
      </View>
      <View style={styles.billActions}>
        <TouchableOpacity style={styles.detailButton} onPress={onDetail}>
          <Text style={styles.detailText}>Chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton} onPress={onPayment}>
          <Text style={styles.paymentText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
