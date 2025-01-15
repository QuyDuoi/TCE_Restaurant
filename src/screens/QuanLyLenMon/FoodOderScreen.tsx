import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
  Modal,
} from 'react-native';
import {
  getListChiTietHoaDonTheoCaLam,
  updateStatusChiTietHoaDon,
  xacNhanYeuCauHuyMon,
} from '../../services/api';
import ItemChiTietHoaDon from './ItemChiTietHoaDon';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import {FlatList} from 'react-native-gesture-handler';
import {ChiTietHoaDon} from '../../store/Slices/ChiTietHoaDonSlice';
import {UserLogin} from '../../navigation/CustomDrawer';
import {useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from '../../customcomponent/CustomToast';

const FoodOrderScreen: React.FC = () => {
  const [dsChiTiet, setDsChiTiet] = useState<{
    hoanThanh: ChiTietHoaDon[];
    chuaHoanThanh: ChiTietHoaDon[];
    theoTenMon: {[key: string]: ChiTietHoaDon[]};
  }>({
    hoanThanh: [],
    chuaHoanThanh: [],
    theoTenMon: {},
  });
  const [filter, setFilter] = useState<string>('Chưa hoàn thành'); // Bộ lọc hiện tại
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [isRefreshing, setIsRefreshing] = useState(false); // Trạng thái refreshing
  const [tenMons, setTenMons] = useState<string[]>([]); // Danh sách tên món
  const [error, setError] = useState(''); // Trạng thái lỗi
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [currentCancellationRequest, setCurrentCancellationRequest] = useState<{
    id_chiTietHoaDon: string;
    tenMon: string;
    soLuongMon: number;
    ban: string;
    khuVuc: string;
  } | null>(null);
  const {showToast} = useToast();
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

  const capNhatTtMon = async (item: ChiTietHoaDon) => {
    try {
      if (item?.trangThai === true) {
        showToast('remove', 'Món ăn đã được hoàn thành.', '#FF602B', 1500);
      } else {
        await updateStatusChiTietHoaDon(item._id!, item.trangThai);

        fetchChiTietHoaDon();
        showToast('check', 'Hoàn thành món ăn.', 'white', 1500);
      }
    } catch (err: any) {
      showToast('check', err.message, 'white', 1500);
    }
  };

  const handleRespondCancellation = async (isApproved: boolean) => {
    if (!currentCancellationRequest) return;

    const {id_chiTietHoaDon} = currentCancellationRequest;
    const id_nhanVien = user?._id; // Giả sử user.id là ID của đầu bếp

    try {
      // Gọi API để phản hồi yêu cầu hủy món
      await xacNhanYeuCauHuyMon(id_chiTietHoaDon, isApproved, id_nhanVien); // Thêm các tham số cần thiết

      // Hiển thị thông báo
      showToast(
        isApproved ? 'check' : 'remove',
        isApproved ? 'Hủy món đã được phê duyệt.' : 'Hủy món đã bị từ chối.',
        isApproved ? '#28a745' : '#dc3545',
        2000,
      );

      // Cập nhật danh sách
      fetchChiTietHoaDon();

      // Đóng modal
      setIsCancelModalVisible(false);
      setCurrentCancellationRequest(null);
    } catch (error: any) {
      showToast('error', error.message || 'Đã xảy ra lỗi.', '#dc3545', 2000);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChiTietHoaDon();
    }, []),
  );

  useEffect(() => {
    const socket = io('https://tce-restaurant-api.onrender.com');

    socket.emit('NhanDien', {
      role: 'DauBep',
    });

    socket.on('lenMon', () => {
      fetchChiTietHoaDon();
      showToast('check', 'Vừa có khách đặt món.', 'white', 2000);
    });

    socket.on('yeuCauHuyMon', data => {
      setCurrentCancellationRequest({
        id_chiTietHoaDon: data.id_chiTietHoaDon,
        tenMon: data.tenMon,
        soLuongMon: data.soLuongMon,
        ban: data.ban,
        khuVuc: data.khuVuc,
      });
      setIsCancelModalVisible(true);
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
    } else {
      // Filter by dish name
      return dsChiTiet.theoTenMon[filter] || [];
    }
  }, [filter, dsChiTiet]);

  const renderItem = ({item}: {item: ChiTietHoaDon}) => (
    <ItemChiTietHoaDon
      tenMon={item?.id_monAn?.tenMon}
      trangThai={item?.trangThai}
      soLuong={item?.soLuongMon}
      ghiChu={item?.ghiChu}
      onClick={() => {
        capNhatTtMon(item);
      }}
      anhMonAn={item?.id_monAn?.anhMonAn}
      ban={item?.ban?.tenBan}
      khuVuc={item?.khuVuc?.tenKhuVuc}
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

          {filter === 'Chưa hoàn thành' &&
          dsChiTiet.chuaHoanThanh.length === 0 ? (
            // Hiển thị thông báo khi không còn món ăn chưa hoàn thành
            <View style={styles.noPendingContainer}>
              <Text style={styles.noPendingText}>
                Tất cả món ăn đã được hoàn thành
              </Text>
            </View>
          ) : (
            // Hiển thị danh sách FlatList nếu có dữ liệu
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
                  colors={[colors.blue, colors.orange]} // Màu sắc hiệu ứng
                />
              }
            />
          )}
          <Modal
            transparent={true}
            animationType="slide"
            visible={isCancelModalVisible}
            onRequestClose={() => setIsCancelModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Yêu Cầu Hủy Món</Text>
                {currentCancellationRequest && (
                  <>
                    <Text style={styles.modalText}>
                      <Text style={styles.boldText}>Tên Món:</Text>{' '}
                      {currentCancellationRequest.tenMon}
                    </Text>
                    <Text style={styles.modalText}>
                      <Text style={styles.boldText}>Số Lượng:</Text>{' '}
                      {currentCancellationRequest.soLuongMon}
                    </Text>
                    <Text style={styles.modalText}>
                      <Text style={styles.boldText}>Bàn:</Text>{' '}
                      {currentCancellationRequest.ban}
                    </Text>
                    <Text style={styles.modalText}>
                      <Text style={styles.boldText}>Khu Vực:</Text>{' '}
                      {currentCancellationRequest.khuVuc}
                    </Text>
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={[styles.button, styles.confirmButton]}
                        onPress={() => handleRespondCancellation(true)}>
                        <Text style={styles.buttonText}>Xác nhận</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.rejectButton]}
                        onPress={() => handleRespondCancellation(false)}>
                        <Text style={styles.buttonText}>Từ chối</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsCancelModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    justifyContent: 'center', // Căn giữa theo chiều dọc
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
  noPendingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noPendingText: {
    fontSize: 18,
    color: colors.primary,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#28a745',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#6c757d',
    borderRadius: 5,
    paddingVertical: 10,
    width: '100%',
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
