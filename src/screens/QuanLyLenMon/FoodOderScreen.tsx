import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {getListChiTietHoaDonTheoCaLam} from '../../services/api';
import ItemChiTietHoaDon from './ItemChiTietHoaDon';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {FlatList} from 'react-native-gesture-handler';
import {ChiTietHoaDon} from '../../store/Slices/ChiTietHoaDonSlice';
import {UserLogin} from '../../navigation/CustomDrawer';
import {useSelector} from 'react-redux';
import {io} from 'socket.io-client';

const FoodOrderScreen: React.FC = () => {
  const [dsChiTiet, setDsChiTiet] = useState<ChiTietHoaDon[]>([]);
  const [filter, setFilter] = useState<string>('Chưa hoàn thành'); // Bộ lọc hiện tại
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [isRefreshing, setIsRefreshing] = useState(false); // Trạng thái refreshing
  const [tenMons, setTenMons] = useState<string[]>([]); // Danh sách tên món
  const [error, setError] = useState(''); // Trạng thái lỗi
  const user: UserLogin = useSelector(state => state.user);
  const id_nhaHang = user.id_nhaHang._id;

  const fetchChiTietHoaDon = async (refresh = false) => {
    if (!refresh) setIsLoading(true);
    setError(''); // Xóa lỗi cũ khi bắt đầu fetch
    try {
      const chiTietHoaDons = await getListChiTietHoaDonTheoCaLam(id_nhaHang);
      setDsChiTiet(chiTietHoaDons);

      const uniqueTenMons = Object.keys(chiTietHoaDons?.theoTenMon || {});
      setTenMons(uniqueTenMons);
    } catch (error: any) {
      setError(error.message || 'Không thể kết nối tới server.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false); // Kết thúc hiệu ứng refreshing
    }
  };

  useEffect(() => {
    fetchChiTietHoaDon();
  }, []);

  useEffect(() => {
    const socket = io('https://tce-restaurant-api.onrender.com');
    socket.on('lenMon', () => {
      fetchChiTietHoaDon();
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredChiTiet = useMemo(() => {
    if (!dsChiTiet) return []; // If data is not loaded yet

    if (filter === 'Hoàn thành') {
      return dsChiTiet.hoanThanh; // Return completed items
    } else if (filter === 'Chưa hoàn thành') {
      return dsChiTiet.chuaHoanThanh; // Return not completed items
    } else if (filter === 'Tất cả') {
      return [...dsChiTiet.hoanThanh, ...dsChiTiet.chuaHoanThanh]; // Return all items
    } else {
      // Filter by dish name
      return dsChiTiet.theoTenMon[filter] || [];
    }
  }, [filter, dsChiTiet]);

  const renderItem = ({item}: {item: ChiTietHoaDon}) => (
    <ItemChiTietHoaDon
      tenMon={item.id_monAn?.tenMon}
      trangThai={item.trangThai}
      soLuong={item.soLuongMon}
      ghiChu={item.ghiChu}
      onClick={() => {}}
      anhMonAn={item.id_monAn?.anhMonAn}
      ban={item.ban?.tenBan}
      khuVuc={item.khuVuc?.tenKhuVuc}
    />
  );

  if (isLoading) {
    return (
      <View
        style={[
          hoaStyles.containerTopping,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error ? (
        // View lỗi nếu `error` không rỗng
        <View style={styles.errorContainer}>
          <Image
            style={styles.image}
            source={require('../../image/waitingOrder.png')}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError('');
              setIsLoading(true);
              // Gọi lại hàm fetch
              fetchChiTietHoaDon();
            }}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Hiển thị danh sách item nếu không có lỗi
        <>
          <View>
            <FlatList
              data={['Chưa hoàn thành', 'Hoàn thành', ...tenMons]}
              horizontal
              keyExtractor={(item, index) => `${item}-${index}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    filter === item && styles.filterButtonActive,
                  ]}
                  onPress={() => setFilter(item)}>
                  <Text
                    style={[
                      styles.filterText,
                      filter === item && styles.filterTextActive,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <FlatList
            data={filteredChiTiet}
            keyExtractor={item => item._id!}
            renderItem={renderItem}
            extraData={filter}
            contentContainerStyle={{paddingBottom: 20}}
            initialNumToRender={10} // Tăng tốc render
            windowSize={5} // Hiển thị trước và sau 5 item
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true);
                  fetchChiTietHoaDon(true); // Làm mới danh sách
                }}
                colors={[colors.primary, colors.orange]} // Màu sắc hiệu ứng
              />
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default FoodOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.orange,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
  },
  filterButton: {
    backgroundColor: '#FFC5AD',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: colors.orange,
  },
  filterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
