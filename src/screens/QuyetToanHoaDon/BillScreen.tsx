import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {HoaDon} from '../../store/Slices/HoaDonSlice';
import {fetchKhuVucVaBan} from '../../store/Thunks/khuVucThunks';
import {useNavigation} from '@react-navigation/native';
import {getListHoaDonTheoNhaHang} from '../../services/api';
import ModalPTTT from '../QuanLyCaLam/chiTietHoaDon/ModalPTTT';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UserLogin} from '../../navigation/CustomDrawer';
import {io} from 'socket.io-client';
import {BillItem} from './ItemBill';
import {styles} from './BillStyle';

const BillScreen: React.FC = () => {
  const [billData, setBillData] = useState<HoaDon[]>();
  const [hoaDonSelected, setHoaDonSelected] = useState<HoaDon>();
  const [isVisivleModalPTTT, setIsVisivleModalPTTT] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const user: UserLogin = useSelector(state => state.user);
  const bans = useSelector((state: RootState) => state.ban.bans);
  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const khuVucStatus = useSelector((state: RootState) => state.khuVuc.status);
  const idNhaHang = user.id_nhaHang._id;

  const fetchHoaDonNhaHang = async () => {
    try {
      setIsLoading(true); // Bắt đầu tải dữ liệu
      const response = await getListHoaDonTheoNhaHang(idNhaHang);
      setBillData(response);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setIsLoading(false); // Kết thúc tải dữ liệu
    }
  };

  useEffect(() => {
    if (khuVucStatus === 'idle') {
      dispatch(fetchKhuVucVaBan(idNhaHang) as any);
    }
    fetchHoaDonNhaHang();
  }, [dispatch, bans, khuVucs]);

  useEffect(() => {
    if (isChange) {
      fetchHoaDonNhaHang();
    }
  }, [isChange]);

  useEffect(() => {
    const socket = io('https://tce-restaurant-api.onrender.com');

    socket.on('themHoaDon', () => {
      fetchHoaDonNhaHang();
    });

    socket.on('lenMon', () => {
      fetchHoaDonNhaHang();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleOpenModalPTTT = (hoaDon: HoaDon) => {
    setHoaDonSelected(hoaDon);
    setIsVisivleModalPTTT(true);
  };

  const getBanKhuVuc = (idBan?: string) => {
    if (!idBan) return {tenKhuVuc: '', tenBan: ''};

    const ban = bans.find(item => item._id === idBan);
    if (!ban) return {tenKhuVuc: 'Trống', tenBan: 'Không tồn tại'};

    const khuVuc = khuVucs.find(item => item._id === ban.id_khuVuc);
    return {
      tenKhuVuc: khuVuc?.tenKhuVuc || 'Không tồn tại',
      tenBan: ban.tenBan || 'Không xác định',
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
            borderWidth: isFocused ? 1 : 0,
            borderColor: isFocused ? '#9E81C3' : '#ccc',
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
            placeholder="Tìm kiếm hóa đơn theo bàn"
            style={{width: '90%', fontSize: 15}}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        {isLoading ? ( // Hiển thị trạng thái đang tải
          <ActivityIndicator
            size="large"
            color="#9E81C3"
            style={{marginTop: 20}}
          />
        ) : billData?.length > 0 ? (
          <FlatList
            data={billData}
            renderItem={renderItem}
            keyExtractor={item => item._id as string}
          />
        ) : (
          <Text style={styles.emptyText}>Chưa có hóa đơn nào được tạo!</Text>
        )}
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
