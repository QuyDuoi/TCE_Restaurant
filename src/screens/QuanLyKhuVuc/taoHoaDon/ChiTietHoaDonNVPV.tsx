import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ChiTietHoaDon,
  fetchChiTietHoaDon,
  updateChiTietHoaDonThunk,
} from '../../../store/Slices/ChiTietHoaDonSlice';
import ItemChiTietHoaDon from '../../QuanLyCaLam/chiTietHoaDon/ItemChiTietHoaDon';
import {hoaStyles} from '../../QuanLyThucDon/Hoa/styles/hoaStyles';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import {
  formatDate,
  formatMoney,
} from '../../QuanLyThucDon/Hoa/utils/formatUtils';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import ModalGiamGia from '../../QuanLyCaLam/chiTietHoaDon/ModalGiamGia';
import ModalPTTT from '../../QuanLyCaLam/chiTietHoaDon/ModalPTTT';
import ModalSoLuongMon from '../../QuanLyCaLam/chiTietHoaDon/ModalSoLuongMon';
import ItemCTHDnvpv from './ItemCTHDnvpv';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingModal from 'react-native-loading-modal';
import {io} from 'socket.io-client';
import {useToast} from '../../../customcomponent/CustomToast';

const {height: ScreenHeight} = Dimensions.get('window');

interface Props {
  route: any;
}
const ChiTietHoaDonNVPV = (props: Props) => {
  const {hoaDon, tenKhuVuc, tenBan, caLam} = props.route.params;

  const tenBanNe = tenBan ? tenBan?.toLowerCase() : '';

  const chiTietHoaDons = useSelector(
    (state: RootState) => state.chiTietHoaDons.chiTietHoaDons,
  );

  const chiTietStatus = useSelector(
    (state: RootState) => state.chiTietHoaDons.status,
  );

  const navigation = useNavigation<any>();

  const nhanviens = useSelector((state: RootState) => state.nhanVien.nhanViens);

  const [visibleModalGiamGia, setVisibleModalGiamGia] = useState(false);
  const [visibleModalPTTT, setVisibleModalPTTT] = useState(false);
  const [visibleModalSoLuongMon, setVisibleModalSoLuongMon] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isLoadingChiTiet, setIsLoadingChiTiet] = useState(false);

  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(
    hoaDon.tienGiamGia ? hoaDon.tienGiamGia : null,
  );
  const [isPercent, setIsPercent] = useState(
    hoaDon.tienGiamGia <= 100 ? true : false,
  );
  const [isPaid, setIsPaid] = useState(false);
  const [totalBill, setTotalBill] = useState(
    hoaDon
      ? chiTietHoaDons.reduce((total, item) => {
          return (total += item.giaTien);
        }, 0)
      : 0,
  );

  const {showToast} = useToast();

  const [totalFinalBill, setTotalFinalBill] = useState(
    hoaDon.tongGiaTri ? hoaDon.tongGiaTri : 0,
  );
  const [chiTietSelected, setChiTietSelected] = useState<ChiTietHoaDon | null>(
    null,
  );
  // VUA FIX
  const [tenKhuVucState, setTenKhuVucState] = useState('');

  useEffect(() => {
    setTenKhuVucState(tenKhuVuc);
  }, []);

  useEffect(() => {
    if (!tenKhuVucState) {
      setTenKhuVucState(tenKhuVuc);
      setIsLoadingModal(true);
    } else {
      setIsLoadingModal(false);
    }
  }, [tenKhuVucState]);

  useEffect(() => {
    if (chiTietStatus !== 'succeeded') {
      setIsLoadingChiTiet(true);
    } else {
      setIsLoadingChiTiet(false);
    }
  }, [chiTietStatus]);

  let totalBillCal = chiTietHoaDons.reduce((total: number, item: any) => {
    return (total += item.giaTien);
  }, 0);

  let totalFinalBillCal = () => {
    if (isPercent) {
      return totalBillCal - (totalBillCal * discount) / 100;
    } else {
      return totalBillCal - discount;
    }
  };

  let discountCalculate = () => {
    if (isPercent) {
      return (discount * totalBillCal) / 100;
    } else {
      return discount;
    }
  };

  useEffect(() => {
    if (hoaDon) {
      setTotalBill(totalBillCal);
    }
  }, [totalBillCal, chiTietHoaDons]);

  useEffect(() => {
    setTotalFinalBill(totalFinalBillCal());
  }, [totalFinalBillCal, isPercent, discount]);

  useEffect(() => {
    if (hoaDon) {
      dispatch(fetchChiTietHoaDon(hoaDon._id) as any);
    }
    if (hoaDon?.trangThai) {
      setIsPaid(hoaDon.trangThai === 'Đã Thanh Toán');
    }
  }, [hoaDon]);

  useEffect(() => {
    const socket = io('https://tce-restaurant-api.onrender.com');

    console.log(hoaDon);

    socket.emit('NhanDien', {
      role: 'PhucVuBan',
      id_ban: hoaDon?.id_ban,
    });

    socket.on('hoanThanhMon', data => {
      dispatch(fetchChiTietHoaDon(hoaDon._id) as any);
      showToast('check', `${data.msg}`, 'white', 2500);
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (hoaDon.trangThai === 'Đã Thanh Toán') {
      setIsPaid(true);
    } else if (hoaDon.trangThai === null) {
      setIsPaid(false);
    } else {
      setIsPaid(false);
    }
  }, [hoaDon.trangThai]);

  const handleOpenModalGiamGia = useCallback(() => {
    setVisibleModalGiamGia(prev => !prev);
  }, []);

  const handleOpenModalPTTT = useCallback(() => {
    setVisibleModalPTTT(prev => !prev);
  }, []);

  const handleOpenModalSoLuongMon = useCallback(
    (item: ChiTietHoaDon) => {
      setChiTietSelected(item);
      setVisibleModalSoLuongMon(true);
    },
    [setChiTietSelected],
  );

  //DELETE
  const guiYeuCauHuyMon = async (item: ChiTietHoaDon) => {
    showToast('remove', `Tính năng đăng được phát triển`, 'white', 2000);
  };

  const renderItem = ({item}: {item: ChiTietHoaDon}) => {
    //UPDATE MODEL CHITIETHOADON
    return chiTietHoaDons.length > 0 ? (
      <View>
        {item.monAn ? (
          <ItemCTHDnvpv
            onLongPress={() => {
              handleOpenModalSoLuongMon(item);
            }}
            nameMonAn={item.monAn.tenMon}
            soLuong={item.soLuongMon}
            giaTien={item.giaTien}
            trangThai={item.trangThai}
            key={item._id}
          />
        ) : null}
      </View>
    ) : null;
  };

  const renderHiddenItemChiTietHoaDon = ({item}: {item: ChiTietHoaDon}) => {
    return item.monAn ? (
      <View style={hoaStyles.hiddenOptionView}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={hoaStyles.buttonEdit}
          onPress={() => {
            showToast(
              'remove',
              'Tính năng đang được phát triển!',
              'white',
              1500,
            );
          }}>
          <Icon name="edit" size={20} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={hoaStyles.buttonDelete}
          onPress={() => {
            if (item.trangThai === false) {
              guiYeuCauHuyMon(item);
            } else {
              showToast(
                'remove',
                'Món ăn đã hoàn thành, không thể xóa.',
                'white',
                2000,
              );
            }
          }}>
          <Icon name="trash" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  return (
    <>
      <View
        style={[
          hoaStyles.containerTopping,
          {
            backgroundColor: colors.white,
          },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <SpaceComponent height={6} />
          <RowComponent justify="center">
            <TitleComponent
              text="Thông tin hóa đơn"
              size={21}
              color={colors.red}
            />
          </RowComponent>
          <SpaceComponent height={5} />
          {/* view co ban an */}
          {hoaDon.id_ban ? (
            <View style={[]}>
              <View style={styles.sectionContainer}>
                <SectionComponent styles={styles.section}>
                  <RowComponent justify="space-between">
                    <TextComponent
                      text="Bàn ăn: "
                      styles={styles.text}
                      fontWeight="bold"
                    />
                    <TextComponent
                      text={`${
                        !tenBanNe.includes('bàn') && !tenBanNe.includes('ban')
                          ? 'Bàn: '
                          : ''
                      }${tenBan} | ${tenKhuVucState}`}
                      styles={styles.text2}
                    />
                  </RowComponent>
                </SectionComponent>
                <View style={styles.indicator} />
              </View>
              <SpaceComponent height={10} />
              <View style={styles.sectionContainer}>
                <SectionComponent styles={styles.section}>
                  <RowComponent justify="space-between">
                    <TextComponent
                      text="Thời gian vào: "
                      styles={styles.text}
                    />
                    <TextComponent
                      text={`${new Date(hoaDon?.thoiGianVao)
                        .toLocaleTimeString('vi-VN')
                        .slice(0, 5)} - ${formatDate(
                        new Date(hoaDon?.thoiGianVao),
                      )}`}
                      styles={styles.text2}
                    />
                  </RowComponent>
                </SectionComponent>
                <View style={styles.indicator} />
              </View>
              <SpaceComponent height={10} />
              <View style={styles.sectionContainer}>
                <SectionComponent styles={styles.section}>
                  <RowComponent justify="space-between">
                    <TextComponent
                      text={isPaid ? 'Thanh toán lúc: ' : 'Trạng thái: '}
                      styles={[styles.text, {}]}
                    />
                    <TextComponent
                      text={isPaid ? '18:20 | 20/10/2024' : 'Chưa Thanh Toán'}
                      styles={[
                        styles.text2,
                        {color: !isPaid ? colors.red : undefined},
                      ]}
                    />
                  </RowComponent>
                </SectionComponent>
                <View style={styles.indicator} />
              </View>
            </View>
          ) : null}

          <SpaceComponent height={10} />

          {/* view chi tiet mon an */}
          <View
            style={[
              styles.sectionContainer,
              {
                height:
                  chiTietHoaDons.length <= 4 ? 'auto' : ScreenHeight * 0.4,
              },
            ]}>
            <SectionComponent styles={[styles.section, {flex: 1}]}>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Danh sách gọi món: "
                  styles={styles.text}
                  fontWeight="bold"
                />
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('ThemMonNVPV', {
                      chiTietHoaDon: chiTietHoaDons.filter(
                        ct => ct.trangThai === false,
                      ),
                      hoaDon: hoaDon,
                      tenBan: tenBan,
                      tenKhuVuc: tenKhuVuc,
                    });
                  }}>
                  <TextComponent
                    text={chiTietHoaDons.length > 0 ? 'Chỉnh sửa' : 'Gọi món'}
                    color={colors.blue2}
                    size={16}
                  />
                </TouchableOpacity>
              </RowComponent>
              <SpaceComponent height={5} />
              {chiTietHoaDons.length > 0 ? (
                <View style={[]}>
                  <RowComponent
                    justify="space-between"
                    styles={{
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      backgroundColor: colors.desc2,
                    }}>
                    <View style={{width: '45%'}}>
                      <TitleComponent text="Món" />
                    </View>
                    <RowComponent
                      justify="space-between"
                      styles={{width: '21%'}}>
                      <View>
                        <TitleComponent text="SL" />
                      </View>
                      <View>
                        <TitleComponent text="TT" />
                      </View>
                    </RowComponent>
                    <View
                      style={{
                        width: '23%',
                        alignItems: 'center',
                      }}>
                      <TitleComponent text="Giá" />
                    </View>
                  </RowComponent>
                  <View
                    style={{
                      width: '100%',
                      height: 1 * 1.5,
                      backgroundColor: colors.desc,
                    }}
                  />
                </View>
              ) : (
                <View style={{flex: 1, alignItems: 'center'}}>
                  <SpaceComponent height={8} />
                  <View
                    style={{
                      width: '100%',
                      height: 1 * 1.5,
                      backgroundColor: colors.desc,
                    }}
                  />
                </View>
              )}
              {
                //scroll view
                isLoadingChiTiet ? (
                  <View
                    style={{
                      height: ScreenHeight * 0.1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator size={'small'} color={colors.orange} />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor:
                        chiTietHoaDons.length > 0
                          ? colors.white
                          : 'transparent',
                    }}>
                    {chiTietHoaDons.length > 0 && !isLoadingChiTiet ? (
                      <SwipeListView
                        data={chiTietHoaDons}
                        renderItem={renderItem}
                        nestedScrollEnabled={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderHiddenItem={
                          chiTietHoaDons.length > 0
                            ? renderHiddenItemChiTietHoaDon
                            : undefined
                        }
                        ListEmptyComponent={() => (
                          <View style={{flex: 1, alignItems: 'center'}}>
                            <SpaceComponent height={36} />
                          </View>
                        )}
                        disableRightSwipe={true}
                        rightOpenValue={-110}
                        stopRightSwipe={-120}
                        previewRowKey={chiTietHoaDons.length > 0 ? '0' : ''}
                        previewOpenValue={chiTietHoaDons.length > 0 ? -40 : 0}
                        previewOpenDelay={chiTietHoaDons.length > 0 ? 2000 : 0}
                      />
                    ) : (
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{paddingVertical: 16}}>
                          <TextComponent
                            text="Danh sách trống!"
                            size={14}
                            color={colors.desc}
                          />
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 1 * 1.5,
                            backgroundColor: colors.desc,
                          }}
                        />
                      </View>
                    )}
                  </View>
                )
              }
            </SectionComponent>
          </View>

          <View
            style={[
              styles.sectionContainer,
              {
                paddingHorizontal: 5,
              },
            ]}>
            {isPaid ? (
              <SectionComponent styles={styles.section}>
                <RowComponent justify="space-between">
                  <TextComponent
                    text="Nhân viên thanh toán: "
                    styles={styles.text}
                  />
                  <TextComponent
                    text={hoaDon.nhanVienThanhToan ?? 'Nhân viên'}
                    styles={styles.text2}
                  />
                </RowComponent>
              </SectionComponent>
            ) : (
              <SectionComponent styles={styles.section}>
                <RowComponent justify="space-between">
                  <TextComponent text="Nhân viên tạo: " styles={styles.text} />
                  <TextComponent
                    text={hoaDon.nhanVienTao ?? 'Nhân viên'}
                    styles={styles.text2}
                  />
                </RowComponent>
              </SectionComponent>
            )}
          </View>
          <SpaceComponent height={12} />
          <View
            style={[
              styles.sectionContainer,
              {
                paddingHorizontal: 5,
              },
            ]}>
            <SectionComponent styles={styles.section}>
              <RowComponent justify="space-between">
                <TextComponent text="Tổng tạm tính: " styles={styles.text} />
                <TextComponent
                  text={`${formatMoney(totalBill)}`}
                  styles={styles.text}
                />
              </RowComponent>
            </SectionComponent>
          </View>

          {discount && discount > 0 ? (
            <View
              style={[
                styles.sectionContainer,
                {
                  paddingHorizontal: 5,
                },
              ]}>
              <SectionComponent styles={styles.section}>
                <RowComponent justify="space-between">
                  <TextComponent text="Giảm giá: " color={colors.status2} />
                  <TextComponent
                    text={`-${formatMoney(discountCalculate())}`}
                    color={colors.status2}
                  />
                </RowComponent>
              </SectionComponent>
            </View>
          ) : null}

          <View
            style={[
              styles.sectionContainer,
              {
                paddingHorizontal: 10,
              },
            ]}>
            <SectionComponent styles={styles.section}>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Tổng tiền: "
                  fontWeight="bold"
                  size={18}
                  color={colors.black}
                />
                <TextComponent
                  text={`${formatMoney(totalFinalBill)}`}
                  fontWeight="bold"
                  size={18}
                  color={colors.black}
                />
              </RowComponent>
            </SectionComponent>
          </View>
          <SpaceComponent height={12} />
          <RowComponent styles={{marginVertical: 8}} justify="center">
            <ButtonComponent
              title="Đóng"
              onPress={() => {
                navigation.goBack();
              }}
              titleFontWeight="500"
              titleSize={14}
              styles={[styles.button]}
              boderRadius={2}
              titleColor={colors.desc}
              bgrColor={colors.desc2}
            />
          </RowComponent>
        </ScrollView>
      </View>
      <ModalGiamGia
        visible={visibleModalGiamGia}
        onClose={handleOpenModalGiamGia}
        onValueChange={value => setDiscount(Number(value))}
        discountValue={hoaDon.tienGiamGia.toString()}
        onIsPercentChange={value => setIsPercent(value)}
      />
      <ModalPTTT
        visible={visibleModalPTTT}
        onClose={handleOpenModalPTTT}
        totalFinalBill={totalFinalBill}
        hoaDon={hoaDon}
        discount={discount}
      />
      <ModalSoLuongMon
        visible={visibleModalSoLuongMon}
        onClose={() => {
          setVisibleModalSoLuongMon(false);
        }}
        item={chiTietSelected}
        hoaDon={hoaDon}
      />
      <LoadingModal
        modalVisible={isLoadingModal}
        darkMode={false}
        title="Đang xử lý ..."
        color={colors.orange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: colors.black,
  },
  text2: {
    fontSize: 15,
    color: colors.desc,
  },
  indicator: {
    width: '91%',
    height: 1,
    backgroundColor: colors.desc2,
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  section: {
    width: '93%',
  },
  button: {
    width: '40%',
    marginHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
});

export default ChiTietHoaDonNVPV;
