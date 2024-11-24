import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import CardComponent from '../components/CardComponent';
import TextComponent from '../components/TextComponent';
import TitleComponent from '../components/TitleComponent';
import RowComponent from '../components/RowComponent';
import ButtonComponent from '../components/ButtonComponent';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import ItemHoaDon from './ItemHoaDon';
import {formatDate, formatMoney, formatTime} from '../utils/formatUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../components/ModalComponent';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {
  fetchHoaDonTheoCaLam,
  HoaDon,
} from '../../../../store/Slices/HoaDonSlice';
import {fetchKhuVucs, KhuVuc} from '../../../../store/Slices/KhuVucSlice';
import {Ban, fetchBans} from '../../../../store/Slices/BanSlice';
import {useNavigation} from '@react-navigation/native';
import { fetchKhuVucVaBan } from '../../../../store/Thunks/khuVucThunks';
const ChiTietCaLam = ({route}: {route: any}) => {
  const {caLam} = route.params;

  const idNhaHang = '66fab50fa28ec489c7137537';

  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [bansByKhuVuc, setBansByKhuVuc] = useState<(Ban & {kv: KhuVuc})[]>([]);

  const navigation = useNavigation<any>();

  const batDau = caLam.batDau ? new Date(caLam.batDau) : new Date();
  const ketThuc = caLam.ketThuc ? new Date(caLam.ketThuc) : undefined;

  const dispatch = useDispatch();
  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const bans = useSelector((state: RootState) => state.ban.bans);
  const hoaDons = useSelector((state: RootState) => state.hoaDons.hoaDons);
  const nhanViens = useSelector((state: RootState) => state.nhanVien.nhanViens);

  //fetch hoa don va khu vuc tu api ve redux store
  useEffect(() => {
    console.log('fetch hoa don');

    dispatch(fetchHoaDonTheoCaLam(caLam._id as string) as any);

    if (bans.length === 0) {
      dispatch(fetchKhuVucVaBan(idNhaHang) as any);
    }
  }, [caLam, dispatch]);

  useEffect(() => {
    if (bans.length > 0) {
      setBansByKhuVuc(bans as any);
    }
  }, [bans]);
  console.log('render chi tiet ca lam');

  const getKhuVucBan = (idBan?: string) => {
    if (!idBan) return { tenKhuVuc: '', tenBan: '' };
  
    // Tìm bàn từ danh sách `bansByKhuVuc`
    const ban = bansByKhuVuc.find(item => item._id === idBan);
    if (!ban) return { tenKhuVuc: 'Không xác định', tenBan: 'Không xác định' };
  
    // Tìm khu vực từ thuộc tính `id_khuVuc` của bàn
    const khuVuc = khuVucs.find(kv => kv._id === ban.id_khuVuc);
  
    return {
      tenKhuVuc: khuVuc?.tenKhuVuc || 'Không xác định',
      tenBan: ban.tenBan || 'Không xác định',
    };
  };

  const renderItem = ({item}: {item: HoaDon}) => {
    const {tenKhuVuc, tenBan} = getKhuVucBan(item.id_ban);

    return (
      <ItemHoaDon
        key={item._id}
        hoaDon={item}
        tenKhuVuc={tenKhuVuc}
        tenBan={tenBan}
        onPress={() => {
          //console.log(item.id_nhanVien);

          navigation.navigate('ChiTietHoaDonScreen', {
            hoaDon: item,
            tenKhuVuc: tenKhuVuc,
            tenBan: tenBan,
            caLam: caLam,
            type: 'chiTietCaLam',
          });
        }}
      />
    );
  };

  return (
    <>
      <View
        style={[
          hoaStyles.containerTopping,
          {
            backgroundColor: colors.gray,
          },
        ]}>
        <SpaceComponent height={5} />
        <View style={[styles.container]}>
          <View>
            <CardComponent
              styles={{
                paddingHorizontal: 5,
              }}>
              <View
                style={{
                  marginVertical: 5,
                  marginHorizontal: 3,
                }}>
                <RowComponent justify="space-between">
                  <TitleComponent text="Chi tiết ca làm" size={19} />
                  <Icon
                    name="mail-reply"
                    size={22}
                    color={colors.black}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                </RowComponent>
                <TextComponent
                  text={`Nhân viên mở ca: ${
                    nhanViens.find(
                      nhanvien => nhanvien._id === caLam.id_nhanVien._id,
                    )?.hoTen
                  }`}
                  color={colors.black}
                />
                <TextComponent
                  text={`Ngày mở: ${formatDate(batDau)}`}
                  color={colors.black}
                />
                <TextComponent
                  text={`Thời gian mở: ${formatTime(batDau)}`}
                  color={colors.black}
                />
                <TextComponent
                  text={`Thời gian đóng: ${
                    ketThuc ? formatTime(ketThuc) : 'Đang mở'
                  }`}
                  color={colors.black}
                />
                <RowComponent
                  justify="space-between"
                  styles={{
                    marginHorizontal: 12,
                    marginVertical: 20,
                  }}>
                  <ButtonComponent
                    disabled={caLam.ketThuc ? true : false}
                    title={caLam.ketThuc ? 'Đã đóng' : 'Đóng ca'}
                    onPress={() => {
                      console.log('Dong ca ne');
                    }}
                    titleSize={15}
                    bgrColor={caLam.ketThuc ? colors.desc : colors.blue2}
                    titleColor={colors.white}
                    styles={{
                      height: 30,
                      paddingHorizontal: 10,
                    }}
                    boderRadius={5}
                  />
                  <ButtonComponent
                    title="Chi tiết doanh thu"
                    onPress={() => setIsVisibleDialog(true)}
                    titleSize={15}
                    bgrColor={colors.orange}
                    titleColor={colors.white}
                    styles={{
                      height: 30,
                      paddingHorizontal: 8,
                    }}
                    boderRadius={5}
                  />
                </RowComponent>
              </View>
            </CardComponent>
          </View>
          <SpaceComponent height={10} />
          <View style={[styles.bottomContainer]}>
            <View style={{flex: 1, margin: 10}}>
              <TitleComponent text="Danh sách hóa đơn" />
              <SpaceComponent height={10} />
              {hoaDons.length > 0 ? (
                <FlatList
                  data={hoaDons}
                  renderItem={renderItem}
                  keyExtractor={item => item._id as any}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TitleComponent text="Không có hóa đơn nào trong ca làm này" />
                </View>
              )}
              <SpaceComponent height={16} />
            </View>
          </View>
        </View>
      </View>

      <ModalComponent
        visible={isVisibleDialog}
        title="Chi tiết doanh thu"
        isClose
        onClose={() => setIsVisibleDialog(false)}>
        <TextComponent
          text={`Số dư ban đầu: ${formatMoney(caLam.soDuBanDau)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Số dư hiện tại: ${formatMoney(caLam.soDuHienTai)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng tiền mặt: ${formatMoney(caLam.tongTienMat)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng chuyển khoản: ${formatMoney(caLam.tongChuyenKhoan)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng doanh thu: ${formatMoney(caLam.tongDoanhThu)}`}
          styles={styles.textStyle}
        />
        <RowComponent justify="flex-start">
          <TextComponent text="Phiếu thu, chi:" styles={styles.textStyle} />
          <ButtonComponent
            title="Chi tiết"
            onPress={() => {
              navigation.navigate('ThuChiScreen', {caLam: caLam});
            }}
            bgrColor={colors.blue2}
            titleColor={colors.white}
            titleSize={12}
            styles={{
              paddingHorizontal: 10,
              marginLeft: 10,
              height: 20,
            }}
            boderRadius={5}
          />
        </RowComponent>
        <TextComponent
          text={`Tổng thu: ${formatMoney(caLam.tongThu)}`}
          styles={styles.textStyle}
        />
        <TextComponent
          text={`Tổng chi: ${formatMoney(caLam.tongChi)}`}
          styles={styles.textStyle}
        />
      </ModalComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    width: '95%',
    height: '98%',
    alignSelf: 'center',
    marginTop: 5,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  textStyle: {
    color: colors.black,
    fontSize: 15,
    marginBottom: 8,
  },
});

export default ChiTietCaLam;
