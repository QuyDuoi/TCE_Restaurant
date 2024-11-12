import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonAnTheoId, MonAn } from '../../store/MonAnSlice';
import OrderDetailModal from './ModalDetailOder';
import { IPV4 } from '../../services/api';
import { AppDispatch, RootState } from '../../store/store';
import { fetchHoaDon } from '../../store/HoaDonSlice';
import { ChiTietHoaDon, updateStatusChiTietHoaDonThunk } from '../../store/ChiTietHoaDonSlice';
import { useFocusEffect } from '@react-navigation/native';
import { fetchChiTietHoaDonTheoCaLam } from '../../store/CaLamSlice';
import ItemChiTietHoaDon from './ItemChiTietHoaDon';
import { hoaStyles } from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import { colors } from '../QuanLyThucDon/Hoa/contants/hoaColors';
import { FlatList } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');



const FoodOrderScreen: React.FC = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const statusCaLam = useSelector((state: RootState) => state.calam.status);
  const chitietHoaDons = useSelector((state: RootState) => state.calam.chiTietHoaDons);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [filterChiTietHoaDon, setFilterChiTietHoaDon] = useState<ChiTietHoaDon[]>([]);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const id_caLam = '67078655a4fa7c03a24d2c19';
    if (statusCaLam === 'idle') {
      dispatch(fetchChiTietHoaDonTheoCaLam(id_caLam));
      setIsLoading(true);
    } else if (statusCaLam === 'succeeded') {
      // Chia thành 2 phần: phần chưa hoàn thành (trangThai = false) và đã hoàn thành (trangThai = true)
      const incompleteItems = chitietHoaDons.filter(item => !item.trangThai); // Món chưa hoàn thành
      const completedItems = chitietHoaDons.filter(item => item.trangThai); // Món đã hoàn thành

      // Sắp xếp món chưa hoàn thành theo createAt (thời gian tạo)
      const sortedIncompleteItems = incompleteItems.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA - timeB; // Tăng dần theo thời gian tạo
      });

      // Sắp xếp món đã hoàn thành theo updateAt (thời gian cập nhật)
      const sortedCompletedItems = completedItems.sort((a, b) => {
        const timeA = new Date(a.updatedAt).getTime();
        const timeB = new Date(b.updatedAt).getTime();
        return timeB - timeA; // Giảm dần theo thời gian cập nhật
      });

      // Gộp lại 2 phần: món chưa hoàn thành ở trên, món đã hoàn thành ở dưới
      const sortedItems = [...sortedIncompleteItems, ...sortedCompletedItems];
      setFilterChiTietHoaDon(sortedItems);
      setIsLoading(false);
    } else if (statusCaLam === 'failed') {
      setIsLoading(false);
    }
  }, [dispatch, statusCaLam, chitietHoaDons]);

  // Hàm lọc theo tìm kiếm
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    const filteredData = chitietHoaDons.filter(item =>
      item.id_monAn.tenMon.toLowerCase().includes(text.toLowerCase())
    );
    setFilterChiTietHoaDon(filteredData); // Cập nhật danh sách lọc
  };

  const handleStatusChange = async (id: string, value: boolean) => {
    if (id) {
      const formData = {
        trangThai: value,
      };

      try {
        // Gọi thunk để cập nhật trạng thái món ăn
        await dispatch(updateStatusChiTietHoaDonThunk({ id, formData } as any) as any);
        // Sau khi trạng thái món ăn được cập nhật, cập nhật lại món ăn đó trong danh sách
        setFilterChiTietHoaDon((prevState) => {
          // Cập nhật lại trạng thái món ăn
          const updatedItems = prevState.map((item) =>
            item._id === id ? { ...item, trangThai: value } : item
          );

          // Sắp xếp lại danh sách sau khi thay đổi trạng thái
          const incompleteItems = updatedItems.filter(item => !item.trangThai); // Món chưa hoàn thành
          const completedItems = updatedItems.filter(item => item.trangThai); // Món đã hoàn thành

          // Sắp xếp món chưa hoàn thành theo createAt (thời gian tạo)
          const sortedIncompleteItems = incompleteItems.sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeA - timeB; // Tăng dần theo thời gian tạo
          });

          // Sắp xếp món đã hoàn thành theo updateAt (thời gian cập nhật)
          const sortedCompletedItems = completedItems.sort((a, b) => {
            const timeA = new Date(a.updatedAt).getTime();
            const timeB = new Date(b.updatedAt).getTime();
            return timeB - timeA; // Giảm dần theo thời gian cập nhật
          });

          // Gộp lại 2 phần: món chưa hoàn thành ở trên, món đã hoàn thành ở dưới
          return [...sortedIncompleteItems, ...sortedCompletedItems];
        });

      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
      }
    } else {
      console.error('ID của chi tiết hóa đơn không tồn tại.');
    }
  };


  const renderItem = ({ item }: { item: ChiTietHoaDon }) => {
    const monAnImg = item.id_monAn.anhMonAn
      ? item.id_monAn.anhMonAn.replace('localhost:3000', IPV4)
      : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';
    console.log(item.id_monAn.anhMonAn);
    return (
      <ItemChiTietHoaDon
        // onPress={() => props.navigation.navigate('EmployeeDetails', {nhanVien: item})}
        tenMon={item.id_monAn.tenMon}
        trangThai={item.trangThai}
        soLuong={item.soLuongMon}
        onClick={() => handleStatusChange(item._id, !item.trangThai)}
        // colorStatus={item.trangThai ? '#E7F4FF' : '#FFD2CD'}
        anhMonAn={monAnImg}  // Truyền đúng trường đại diện cho avatar
      />
    );
  };


  if (isLoading) {
    return (
      <View
        style={[
          hoaStyles.containerTopping,
          { justifyContent: 'center', alignItems: 'center' },
        ]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }



  return (
    <SafeAreaView style={hoaStyles.containerTopping}>
      <Text style={styles.header}>Quản lý lên món</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm món ăn"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />

      <FlatList
        data={filterChiTietHoaDon}
        keyExtractor={(item) => item._id} // Sử dụng id của từng item làm key
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Để tránh item cuối bị cắt đứt
      />
    </SafeAreaView>
  );
}

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
    marginBottom: height * 0.02,
  },

});
