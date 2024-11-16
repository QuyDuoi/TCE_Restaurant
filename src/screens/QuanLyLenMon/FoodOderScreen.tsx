import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {getListChiTietHoaDonTheoCaLam, IPV4} from '../../services/api';
import ItemChiTietHoaDon from './ItemChiTietHoaDon';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {FlatList} from 'react-native-gesture-handler';
import {ChiTietHoaDon} from '../../store/Slices/ChiTietHoaDonSlice';

const {width, height} = Dimensions.get('window');

const FoodOrderScreen: React.FC = () => {
  const [dsChiTiet, setDsChiTiet] = useState<ChiTietHoaDon[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái tìm kiếm (có thể phát triển sau)

  useEffect(() => {
    const fetchChiTietHoaDon = async () => {
      setIsLoading(true);
      try {
        const id_nhaHang = '66fab50fa28ec489c7137537';
        const chiTietHoaDons = await getListChiTietHoaDonTheoCaLam(id_nhaHang);
        setDsChiTiet(chiTietHoaDons);
        console.log(chiTietHoaDons);
      } catch (error) {
        console.log('Lỗi khi lấy danh sách chi tiết hóa đơn:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChiTietHoaDon();
  }, []);

  const renderItem = ({item}: {item: ChiTietHoaDon}) => {
    const monAnImg = item.id_monAn?.anhMonAn
      ? item.id_monAn.anhMonAn.replace('localhost:3000', IPV4)
      : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

    return (
      <ItemChiTietHoaDon
        tenMon={item.id_monAn?.tenMon}
        trangThai={item.trangThai}
        soLuong={item.soLuongMon}
        onClick={() => {}}
        anhMonAn={monAnImg}
        ban={item.ban.tenBan}
        khuVuc={item.khuVuc.tenKhuVuc}
      />
    );
  };

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
    <SafeAreaView style={hoaStyles.containerTopping}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm món ăn"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={dsChiTiet}
        keyExtractor={item => item._id} // Đảm bảo _id là một chuỗi
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 20}} // Để tránh item cuối bị cắt đứt
      />
    </SafeAreaView>
  );
};

export default FoodOrderScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#ff7f50',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    height: height * 0.07,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    marginVertical: 5,
  },
});
