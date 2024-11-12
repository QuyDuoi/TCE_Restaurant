import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {BillData, sampleData} from './BillData';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {
  fetchHoaDonTheoCaLam,
  fetchHoaDonTheoNhaHang,
  HoaDon,
} from '../../store/HoaDonSlice';
import {fetchCaLam} from '../../store/CaLamSlice';
import {fetchKhuVucs} from '../../store/KhuVucSlice';
import {Ban, fetchBans} from '../../store/BanSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ModalPTTT from '../QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ModalPTTT';

const {width, height} = Dimensions.get('window');

const calculateDuration = (timeIn?: string) => {
  if (!timeIn) return 'null';
  const [time, date] = timeIn.split('|').map(str => str.trim());
  const [hoursIn, minutesIn] = time.split(':').map(Number);
  const [day, month, year] = date.split('/').map(Number);

  const startTime = new Date(year, month - 1, day, hoursIn, minutesIn);
  const currentTime = new Date();
  const diffMs = currentTime.getTime() - startTime.getTime();

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};

//item list hoa don
const BillItem: React.FC<{
  hoaDon: HoaDon;
  tenKhuVuc: string;
  tenBan: string;
  onDetail: () => void;
  onPayment: () => void;
}> = ({hoaDon, tenKhuVuc, tenBan, onDetail, onPayment}) => {
  //const [duration, setDuration] = useState(calculateDuration(hoaDon.timeIn));

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDuration(calculateDuration(bill.timeIn));
  //   }, 6000);

  //   return () => clearInterval(interval); // Xóa bộ đếm khi không cần thiết
  // }, [bill.timeIn]);

  return (
    <View style={styles.billContainer}>
      <View style={styles.billInfo}>
        {hoaDon.id_ban ? (
          <View>
            <Text style={styles.billText}>
              <Text style={styles.boldText}>Khu Vực: </Text>
              {`${tenBan.length === 1 ? 'Ban: ' + tenBan : tenBan} - ${
                tenKhuVuc ?? 'null'
              }`}
            </Text>
            <Text style={styles.billText1}>
              <Text style={styles.boldText}>Giờ vào:</Text> {'null'}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.billText}>Ban mang di</Text>
          </View>
        )}
        <Text style={styles.totalText}>Tổng tiền: {hoaDon.tongGiaTri}</Text>
      </View>
      <View style={styles.billActions}>
        <Text style={styles.durationText}>Thời gian: {'null'}</Text>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBills, setFilteredBills] = useState<HoaDon[]>([]);
  const [banByKhuVuc, setBanByKhuVuc] = useState<Ban[]>([]);

  const navigation = useNavigation<any>();

  const dispatch = useDispatch();
  const caLams = useSelector((state: RootState) => state.calam.caLams);
  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const bans = useSelector((state: RootState) => state.ban.bans);

  const hoaDons = useSelector((state: RootState) => state.hoaDons.hoaDons);
  // console.log('hoaDons', hoaDons[0]);

  useEffect(() => {
    dispatch(fetchCaLam() as any);
    dispatch(fetchKhuVucs(idNhaHang) as any);
    dispatch(fetchBans() as any);
    if (hoaDons.length === 0) {
      dispatch(fetchHoaDonTheoNhaHang(idNhaHang) as any);
    }
  }, [dispatch]);
  console.log(hoaDons[0]);

  useFocusEffect(() => {
    console.log('focus');

    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchHoaDonTheoNhaHang(idNhaHang) as any);
    });
    return unsubscribe;
  });

  // useEffect(() => {
  //   const fetchAllHoaDons = async () => {
  //     const allHoaDonResponse = await Promise.all(
  //       caLams.map(caLam =>
  //         dispatch(fetchHoaDonTheoCaLam(caLam._id as string) as any),
  //       ),
  //     );
  //     const allHoaDons = allHoaDonResponse.flatMap(response => {
  //       return response.payload.map((hoaDon: HoaDon) => {
  //         return {
  //           ...hoaDon,
  //         };
  //       });
  //     });
  //     const fillteredHoaDons = allHoaDons.filter(hoaDon => {
  //       return hoaDon.trangThai === 'Chưa Thanh Toán';
  //     });
  //     setFilteredBills(fillteredHoaDons);
  //   };
  //   if (caLams.length > 0) {
  //     fetchAllHoaDons();
  //   }
  // }, [caLams]);

  //console.log('filteredBills', filteredBills.length);

  useEffect(() => {
    const filterHoaDon = hoaDons.filter(
      hoaDon => hoaDon.trangThai === 'Chưa Thanh Toán' && hoaDon.id_ban,
    );

    setFilteredBills(filterHoaDon);
  }, [hoaDons]);

  //console.log('caLamHienTai', caLamHienTai);

  const getBanKhuVuc = (idBan?: string) => {
    if (!idBan) return {tenKhuVuc: '', tenBan: ''};
    const ban = bans.find(item => item._id === idBan);
    return {
      tenKhuVuc: ban?.id_khuVuc.tenKhuVuc,
      tenBan: ban?.tenBan,
    };
  };

  //console.log(filteredBills[0].id_chiTietHoaDon);

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
          });
          //console.log(item._id);
        }}
        onPayment={() => {
          console.log(item._id);
        }}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Quyết toán hóa đơn</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm hóa đơn"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredBills}
          renderItem={renderItem}
          keyExtractor={item => item._id as string}
        />
      </SafeAreaView>
      {/* <ModalPTTT visible={true} onClose={() => {}} hoaDon={filteredBills[1]} /> */}
    </>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: width * 0.04,
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
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#999',
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
