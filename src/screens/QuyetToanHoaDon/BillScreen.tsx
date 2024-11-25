import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {HoaDon} from '../../store/Slices/HoaDonSlice';
import {fetchKhuVucVaBan} from '../../store/Thunks/khuVucThunks';
import {useNavigation} from '@react-navigation/native';
import {getListHoaDonTheoNhaHang} from '../../services/api';
import ModalPTTT from '../QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ModalPTTT';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const getTimeDifference = (startTime: string) => {
  const start = new Date(startTime);
  const now = new Date();
  const diff = now.getTime() - start.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60)); // convert milliseconds to hours
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // remaining minutes

  return `${hours} giờ ${minutes} phút`;
};

//item list hoa don
const BillItem: React.FC<{
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

//Man quyet toan hoa don
const BillScreen: React.FC = () => {
  const idNhaHang = '66fab50fa28ec489c7137537';
  const [billData, setBillData] = useState<HoaDon[]>();
  const [hoaDonSelected, setHoaDonSelected] = useState<HoaDon>();
  const [isVisivleModalPTTT, setIsVisivleModalPTTT] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const navigation = useNavigation<any>();

  const dispatch = useDispatch();
  const bans = useSelector((state: RootState) => state.ban.bans);
  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const khuVucStatus = useSelector((state: RootState) => state.khuVuc.status);

  useEffect(() => {
    const fetchHoaDonNhaHang = async () => {
      const response = await getListHoaDonTheoNhaHang(idNhaHang);
      setBillData(response);
    };
    if (khuVucStatus === 'idle') {
      dispatch(fetchKhuVucVaBan(idNhaHang) as any);
    }
    fetchHoaDonNhaHang();
  }, [dispatch, bans, khuVucs]);

  useEffect(() => {
    const fetchHoaDonNhaHang = async () => {
      const response = await getListHoaDonTheoNhaHang(idNhaHang);
      setBillData(response);
    };
    if (isChange) {
      fetchHoaDonNhaHang();
    }
  }, [isChange]);

  const handleOpenModalPTTT = (hoaDon: HoaDon) => {
    setHoaDonSelected(hoaDon);
    setIsVisivleModalPTTT(true);
  };

  const getBanKhuVuc = (idBan?: string) => {
    if (!idBan) return {tenKhuVuc: '', tenBan: ''};
    const ban: any = bans.find(item => item._id === idBan);
    const khuVuc: any = khuVucs.find(item => item._id === ban.id_khuVuc);

    return {
      tenKhuVuc: khuVuc?.tenKhuVuc,
      tenBan: ban?.tenBan,
    };
  };

  const renderItem = ({item}: {item: HoaDon}) => {
    const {tenKhuVuc, tenBan} = getBanKhuVuc(item.id_ban);
    return (
      <BillItem
        hoaDon={item}
        tenKhuVuc={tenKhuVuc ?? 'null'}
        tenBan={tenBan ?? 'null'}
        onDetail={() => {
          navigation.navigate('ChiTietHoaDonScreen', {
            hoaDon: item,
            tenKhuVuc: tenKhuVuc,
            tenBan: tenBan,
            type: 'quyetToan',
          });
        }}
        onPayment={() => {
          handleOpenModalPTTT(item);
        }}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F1F2FC',
            marginHorizontal: 10,
            borderRadius: 10,
            borderWidth: isFocused ? 1 : 0, // Thay đổi border khi focus
            borderColor: isFocused ? '#9E81C3' : '#ccc', // Màu sắc border khi focus
            elevation: 10,
            marginBottom: 10,
          }}>
          <Icon
            name="search"
            size={18}
            color={'black'}
            style={{paddingHorizontal: 15}}
          />
          <TextInput
            onChangeText={() => {}}
            placeholder="Tìm Kiếm "
            style={{width: '90%', fontSize: 15}}
            onFocus={() => setIsFocused(true)} // Cập nhật trạng thái khi focus
            onBlur={() => setIsFocused(false)} // Cập nhật trạng thái khi blur
          />
        </View>
        <FlatList
          data={billData}
          renderItem={renderItem}
          keyExtractor={item => item._id as string}
        />
      </SafeAreaView>
      <ModalPTTT
        visible={isVisivleModalPTTT}
        onClose={() => {
          setHoaDonSelected(undefined);

          setIsVisivleModalPTTT(false);
        }}
        hoaDon={hoaDonSelected as HoaDon}
        totalFinalBill={hoaDonSelected?.tongTien}
        onChange={(value: any) => {
          setIsChange(value);
        }}
        type="quyetToan"
      />
    </>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8FE',
    padding: width * 0.03,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#ff3333',
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
  billContainer: {
    backgroundColor: '#fff',
    padding: width * 0.03,
    borderRadius: 8,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
  },
  billInfo: {
    flex: 3,
  },
  billText: {
    fontSize: width * 0.04,
    paddingBottom: 8,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  billText1: {
    fontSize: width * 0.04,
    paddingBottom: 8,
    color: 'black',
  },
  totalText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#ff3333',
  },
  billActions: {
    flex: 1.8,
    alignItems: 'flex-end',
  },
  durationText: {
    fontSize: width * 0.03,
    marginBottom: height * 0.01,
    color: '#333',
  },
  detailButton: {
    backgroundColor: '#4da6ff',
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.06,
    borderRadius: 4,
    marginBottom: height * 0.01,
  },
  detailText: {
    color: '#fff',
  },
  paymentButton: {
    backgroundColor: '#33cc33',
    paddingVertical: height * 0.006,
    paddingHorizontal: width * 0.022,
    borderRadius: 4,
  },
  paymentText: {
    color: '#fff',
  },
});
