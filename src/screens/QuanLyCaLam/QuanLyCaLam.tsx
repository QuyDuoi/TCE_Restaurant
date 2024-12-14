import {
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import ItemCaLam from './ItemCaLam';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {CaLam, fetchCaLam, moCaLam} from '../../store/Slices/CaLamSlice';
import {NhanVienSlice} from '../../store/Slices/NhanVienSlice';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ModalSelectDate from './ModalSelectDate';
import { UserLogin } from '../../navigation/CustomDrawer';

interface Props {
  setFilterHandler: any;
}
const QuanLyCaLam = (props: Props) => {
  const {setFilterHandler} = props;

  console.log('render quan ly ca lam');

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  const [visibleModalSelectDate, setVisibleModalSelectDate] = useState(false);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const opacity = useSharedValue(0); // Giá trị dùng để điều chỉnh độ trong suốt
  const translateX = useSharedValue(300); // Giá trị dùng để điều chỉnh vị trí X (bắt đầu từ ngoài màn hình)

  const [caLamFilter, setCaLamFilter] = useState<
    (CaLam & {nv: NhanVienSlice})[]
  >([]);
  const [refreshing, setRefreshing] = useState(false);
  const [trangThaiCa, setTrangThaiCa] = useState(true);
  const [soDuBanDau, setSoDuBanDau] = useState('');

  const user: UserLogin = useSelector(state => state.user);
  const caLams = useSelector((state: RootState) => state.calam.caLams);
  const caLamStatus = useSelector((state: RootState) => state.calam.status);
  const checkCaLam = caLams.filter(caLam => !caLam.ketThuc);
  const id_nhanVien = user._id;
  const id_nhaHang = user.id_nhaHang._id;

  //thuc thi nut loc ben drawer
  useEffect(() => {
    setFilterHandler(() => setVisibleModalSelectDate.bind(null, true));
  }, [setFilterHandler]);

  useEffect(() => {
    setIsLoadingFetch(true);
    dispatch(fetchCaLam(id_nhaHang) as any);
    if (checkCaLam) {
      setTrangThaiCa(true);
    } else {
      setTrangThaiCa(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (caLamStatus === 'succeeded') {
      setIsLoadingFetch(false);
    }
  }, [caLamStatus]);

  const sortedCaLam = (caLams: CaLam[]) => {
    return [...caLams].sort((a, b) => {
      return (
        new Date(b.batDau as any).getTime() -
        new Date(a.batDau as any).getTime()
      );
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {duration: 500}), // Hiệu ứng opacity
    transform: [
      {
        translateX: withTiming(translateX.value, {duration: 500}), // Hiệu ứng di chuyển ngang
      },
    ],
  }));

  const handleMoCa = () => {
    setIsInputVisible(true);
    opacity.value = 1; // Hiện view
    translateX.value = 0; // Di chuyển về vị trí trung tâm
  };

  const handleXacNhan = () => {
    opacity.value = 0; // Ẩn view
    translateX.value = 300; // Di chuyển trở lại ngoài màn hình bên phải
    setTimeout(() => setIsInputVisible(false), 500); // Sau 500ms (bằng với thời gian hiệu ứng), ẩn hoàn toàn View
    const newCaLam = {
      soDuBanDau,
      id_nhanVien: id_nhanVien,
      id_nhaHang: id_nhaHang,
    };

    try {
      dispatch(moCaLam(newCaLam)).unwrap(); // Gửi action moCaLam
    } catch (error) {
      console.error('Lỗi khi mở ca làm:', error);
    }
  };

  const convertDate = (date: string) => {
    if (date[1] === '/') {
      date = '0' + date;
    }
    if (date[4] === '/') {
      date = date.slice(0, 3) + '0' + date.slice(3);
    }
    return date.split('/').reverse().join('/');
  };

  useEffect(() => {
    const filtered = caLams.filter(caLam => {
      const caLamDate = new Date(caLam.batDau as any).toLocaleDateString(
        'vi-VN',
      );

      if (!fromDate || !toDate) {
        return true;
      }
      const from = fromDate?.toLocaleDateString('vi-VN');
      const to = toDate?.toLocaleDateString('vi-VN');

      const convertFrom = convertDate(from);
      const convertTo = convertDate(to);
      const convertCaLam = convertDate(caLamDate);

      return convertCaLam >= convertFrom && convertCaLam <= convertTo;
    });

    const sortedCaLam = filtered.sort((a, b) => {
      return (
        new Date(b.batDau as any).getTime() -
        new Date(a.ketThuc as any).getTime()
      );
    });

    setCaLamFilter(sortedCaLam as any);
  }, [fromDate, toDate]);

  const renderItem = ({item}: {item: CaLam & {nv: NhanVienSlice}}) => {
    return (
      <ItemCaLam
        batDau={item.batDau?.toLocaleString('vi-VN')}
        ketThuc={item.ketThuc?.toLocaleString('vi-VN')}
        nhanVienMoCa={item.id_nhanVien.hoTen}
        onPress={() => {
          navigation.navigate('ChiTietCaLam', {caLam: item});
        }}
      />
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setFromDate(null);
    setToDate(null);
    try {
      dispatch(fetchCaLam(id_nhaHang) as any);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const closeFilterDialog = () => {
    setVisibleModalSelectDate(false);
  };

  return (
    <>
      {isLoadingFetch ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      ) : (
        <View style={{backgroundColor: colors.gray}}>
          <View style={[hoaStyles.container]}>
            {!trangThaiCa && (
              <View style={hoaStyles.viewMoCa}>
                <TouchableOpacity
                  style={hoaStyles.buttonMoCa}
                  onPress={handleMoCa}>
                  <Text style={hoaStyles.textMoCa}>Mở ca mới</Text>
                </TouchableOpacity>

                {isInputVisible && (
                  <Animated.View style={[hoaStyles.viewInput, animatedStyle]}>
                    <TextInput
                      onChangeText={setSoDuBanDau}
                      keyboardType="numeric"
                      placeholderTextColor="black"
                      placeholder="Nhập số dư ban đầu"
                      style={hoaStyles.inputMoCa}
                    />
                    <TouchableOpacity
                      style={hoaStyles.buttonXacNhan}
                      onPress={handleXacNhan}>
                      <Text style={hoaStyles.textXacNhan}>Xác nhận</Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </View>
            )}
            <View style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}>
              {fromDate && toDate && caLamFilter.length > 0 ? (
                <FlatList
                  data={sortedCaLam(caLamFilter) as any}
                  renderItem={renderItem}
                  keyExtractor={item => item._id as string}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  }
                />
              ) : caLams.length > 0 && !fromDate && !toDate ? (
                <FlatList
                  data={sortedCaLam(caLams) as any}
                  renderItem={renderItem}
                  keyExtractor={item => item._id as string}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  }
                />
              ) : (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  }
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <TitleComponent
                      text="Không có ca làm nào trong ngày này"
                      color={colors.desc}
                      styles={{
                        textAlign: 'center',
                      }}
                    />
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      )}
      <ModalSelectDate
        visible={visibleModalSelectDate}
        onClose={closeFilterDialog}
        //setDate={setDate}
        setFromDateParent={(val: Date) => setFromDate(val)}
        setToDateParent={(val: Date) => setToDate(val)}
      />
    </>
  );
};

export default QuanLyCaLam;
