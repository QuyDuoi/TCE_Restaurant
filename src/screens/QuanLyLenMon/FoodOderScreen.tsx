import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {getListChiTietHoaDonTheoCaLam} from '../../services/api';
import ItemChiTietHoaDon from './ItemChiTietHoaDon';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {FlatList} from 'react-native-gesture-handler';
import {ChiTietHoaDon} from '../../store/Slices/ChiTietHoaDonSlice';

const FoodOrderScreen: React.FC = () => {
  const [dsChiTiet, setDsChiTiet] = useState<ChiTietHoaDon[]>([]);
  const [filter, setFilter] = useState<string>('Chưa hoàn thành'); // Bộ lọc hiện tại
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [tenMons, setTenMons] = useState<string[]>([]); // Danh sách tên món
  console.log("render lai");

  useEffect(() => {
    const fetchChiTietHoaDon = async () => {
      setIsLoading(true);
      try {
        const id_nhaHang = '66fab50fa28ec489c7137537';
        const chiTietHoaDons = await getListChiTietHoaDonTheoCaLam(id_nhaHang);
        setDsChiTiet(chiTietHoaDons);

        // Lấy danh sách tên món (unique)
        const uniqueTenMons = Object.keys(chiTietHoaDons?.theoTenMon || {});
        setTenMons(uniqueTenMons);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách chi tiết hóa đơn:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChiTietHoaDon();
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
      {/* Danh sách cuộn ngang cho các bộ lọc */}
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

      {/* Danh sách Chi Tiết Hóa Đơn */}
      <FlatList
        data={filteredChiTiet}
        keyExtractor={item => item._id!}
        renderItem={renderItem}
        extraData={filter}
        contentContainerStyle={{paddingBottom: 20}}
        initialNumToRender={10} // Tăng tốc render
        windowSize={5} // Hiển thị trước và sau 5 item
      />
    </SafeAreaView>
  );
};

export default FoodOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});