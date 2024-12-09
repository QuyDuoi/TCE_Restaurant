import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemThuChi from './ItemThuChi';
import FilterOptionItem from './FilterOptionItem'; // Import Component mới
import {useNavigation} from '@react-navigation/native';
import { ipAddress } from '../../services/api';

const ThuChiScreen = ({route}) => {
  const navigation = useNavigation();

  const {caLam} = route.params;
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [dataThu, setDataThu] = useState([]);
  const [dataChi, setDataChi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Thêm trạng thái refreshing

  const id_caLamViec = caLam._id;

  const removeVietnameseTones = str => {
    return str
      .normalize('NFD') // Chuẩn hóa ký tự Unicode
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
      .replace(/đ/g, 'd') // Chuyển "đ" thành "d"
      .replace(/Đ/g, 'D') // Chuyển "Đ" thành "D"
      .toLowerCase(); // Chuyển thành chữ thường
  };

  // Hàm lấy dữ liệu
  const fetchDataThuChi = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ipAddress}/layDsThuChi?id_caLamViec=${id_caLamViec}`,
      );
      const result = await response.json();

      const modifiedData = result.tatCa.map(item => {
        if (item.soTienThu) {
          return {
            id: item._id,
            time: new Date(item.createdAt).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            description: item.moTa,
            amount: item.soTienThu.toLocaleString('vi-VN'),
            status: 'Thu',
          };
        }
        if (item.soTienChi) {
          return {
            id: item._id,
            time: new Date(item.createdAt).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            description: item.moTa,
            amount: item.soTienChi.toLocaleString('vi-VN'),
            status: 'Chi',
          };
        }
        return item;
      });
      setDataAll(modifiedData);

      setDataThu(
        result.thu.map(item => ({
          id: item._id,
          time: new Date(item.createdAt).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          description: item.moTa,
          amount: item.soTienThu.toLocaleString('vi-VN'),
          status: 'Thu',
        })),
      );

      setDataChi(
        result.chi.map(item => ({
          id: item._id,
          time: new Date(item.createdAt).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          description: item.moTa,
          amount: item.soTienChi.toLocaleString('vi-VN'),
          status: 'Chi',
        })),
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Khi dữ liệu được tải xong, tắt trạng thái refreshing
    }
  };

  useEffect(() => {
    fetchDataThuChi();
  }, []);

  useEffect(() => {
    const API_URLS = {
      all: dataAll,
      thu: dataThu,
      chi: dataChi,
    };
    setData(API_URLS[filter] || []);
  }, [filter, dataAll, dataChi, dataThu]);

  const filteredData = data.filter(item => {
    const normalizedDescription = removeVietnameseTones(item.description);
    const normalizedSearch = removeVietnameseTones(search);
    return normalizedDescription.includes(normalizedSearch);
  });

  const renderItemThuChi = ({item}) => {
    return (
      <ItemThuChi
        id={item.id}
        time={item.time}
        status={item.status}
        money={item.amount}
        description={item.description}
      />
    );
  };

  // Hàm xử lý khi kéo xuống để refresh dữ liệu
  const onRefresh = () => {
    setRefreshing(true);
    fetchDataThuChi(); // Gọi lại hàm fetch dữ liệu
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Danh sách thu chi</Text>
        <View style={{paddingHorizontal: 6}}></View>
      </View>

      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm phiếu theo ghi chú"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Hiển thị các tùy chọn lọc */}
      <View style={styles.filterOptions}>
        {['all', 'thu', 'chi'].map(type => (
          <FilterOptionItem
            key={type}
            type={type}
            isActive={filter === type}
            onSelect={() => setFilter(type)}
          />
        ))}
      </View>

      <View style={{width: '100%', height: '80%'}}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderItemThuChi}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, paddingTop: 10, backgroundColor: '#f8f8f8'},
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 8, // Tạo khoảng cách giữa Icon và TextInput
  },
  searchBar: {
    flex: 1, // Cho phép TextInput chiếm toàn bộ không gian còn lại
    paddingVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentFilterTextAll: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
  },
  currentFilterTextThu: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 10,
    fontSize: 16,
    color: 'green',
    backgroundColor: '#d4edda',
    borderRadius: 5,
  },
  currentFilterTextChi: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 10,
    fontSize: 16,
    color: 'red',
    backgroundColor: '#f8d7da',
    borderRadius: 5,
  },
  filterOptions: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ThuChiScreen;
