import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {hoaStyles} from '../../styles/hoaStyles';
import RowComponent from '../../components/RowComponent';
import TitleComponent from '../../components/TitleComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import SpaceComponent from '../../components/SpaceComponent';
import {colors} from '../../contants/hoaColors';
import ItemChiTietHoaDon from './ItemChiTietHoaDon';
import ModalGiamGia from './ModalGiamGia';
import DatBanModal from '../../../../QuanLyKhuVuc/ComponentModal/DatBanModal';
import ModalPTTT from './ModalPTTT';
import ButtonComponent from '../../components/ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../../store/store';
import {formatDate, formatMoney} from '../../utils/formatUtils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ModalSoLuongMon from './ModalSoLuongMon';
import {
  ChiTietHoaDon,
  fetchChiTietHoaDon,
} from '../../../../../store/Slices/ChiTietHoaDonSlice';
import {
  fetchHoaDonTheoCaLam,
  fetchHoaDonTheoNhaHang,
} from '../../../../../store/Slices/HoaDonSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {height: ScreenHeight} = Dimensions.get('window');

interface Props {
  route: any;
}
const ChiTietHoaDonScreen = (props: Props) => {
  const {hoaDon, tenKhuVuc, tenBan, caLam, type} = props.route.params;
  const idNhaHang = '66fab50fa28ec489c7137537';
  //console.log(hoaDon, tenKhuVuc, tenBan);
  console.log('render chi tiet hoa don');
  //console.log(hoaDon._id);

  const chiTietHoaDons = useSelector(
    (state: RootState) => state.chiTietHoaDons.chiTietHoaDons,
  );

  const navigation = useNavigation<any>();

  const nhanviens = useSelector((state: RootState) => state.nhanVien.nhanViens);
  const calams = useSelector((state: RootState) => state.calam.caLams);

  const [visibleModalGiamGia, setVisibleModalGiamGia] = useState(false);
  const [visibleModalPTTT, setVisibleModalPTTT] = useState(false);
  const [visibleModalSoLuongMon, setVisibleModalSoLuongMon] = useState(false);
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
  const [totalFinalBill, setTotalFinalBill] = useState(
    hoaDon.tongGiaTri ? hoaDon.tongGiaTri : 0,
  );
  const [chiTietSelected, setChiTietSelected] = useState<ChiTietHoaDon | null>(
    null,
  );

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (hoaDon) {
      dispatch(fetchChiTietHoaDon(hoaDon._id) as any);
    }
    if (hoaDon?.trangThai) {
      setIsPaid(hoaDon.trangThai === 'Đã Thanh Toán');
    }

    if (hoaDon.trangThai === null) {
      setIsPaid(false);
    } else {
      setIsPaid(false);
    }
  }, [hoaDon]);

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

  const nhanVienThanhToan = nhanviens.find(
    item => item._id === hoaDon.id_nhanVien,
  );

  const renderItem = ({item}: {item: ChiTietHoaDon}) => {
    return (
      <View>
        {item.id_monAn ? (
          <ItemChiTietHoaDon
            onLongPress={() => {
              handleOpenModalSoLuongMon(item);
              //console.log('long press', item._id);
            }}
            nameMonAn={item.id_monAn.tenMon}
            soLuong={item.soLuongMon}
            gia={item.giaTien}
            key={item._id}
          />
        ) : null}
      </View>
    );
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
          <SpaceComponent height={hoaDon.id_ban ? 5 : 15} />
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
                        tenBan.length == 1 ? 'Ban: ' : ''
                      }${tenBan} | ${tenKhuVuc}`}
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
                      text={`${
                        new Date(hoaDon.thoiGianVao)
                          .toLocaleTimeString('vi-VN')
                          .slice(0, 5) +
                        ' - ' +
                        formatDate(new Date(hoaDon.thoiGianVao))
                      } `}
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

              {/* end view ban an */}
            </View>
          ) : (
            <View>
              <View style={styles.sectionContainer}>
                <SectionComponent styles={styles.section}>
                  <RowComponent justify="space-between">
                    <TextComponent
                      text="Trạng thái: "
                      styles={styles.text}
                      fontWeight="bold"
                    />
                    <TextComponent
                      text={isPaid ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                      fontWeight={isPaid ? '600' : '500'}
                      color={isPaid ? 'green' : 'red'}
                    />
                  </RowComponent>
                </SectionComponent>
                <View style={styles.indicator} />
              </View>
              <SpaceComponent height={10} />
              {isPaid && (
                <View style={styles.sectionContainer}>
                  <SectionComponent styles={styles.section}>
                    <RowComponent justify="space-between">
                      <TextComponent
                        text="Thanh Toán: "
                        size={15}
                        color={colors.desc}
                      />
                      <TextComponent
                        text={'18:20 | 20/10/2024'}
                        color={colors.desc}
                      />
                    </RowComponent>
                  </SectionComponent>
                  <View style={styles.indicator} />
                </View>
              )}
            </View>
          )}
          {isPaid && (
            <View style={styles.sectionContainer}>
              <SectionComponent styles={styles.section}>
                <RowComponent justify="space-between">
                  <TextComponent
                    text="Hình thức thanh toán: "
                    size={15}
                    color={colors.black}
                  />
                  <TextComponent
                    text={
                      hoaDon?.hinhThucThanhToan ? 'Chuyyển khoản' : 'Tiền mặt'
                    }
                    color={colors.desc}
                  />
                </RowComponent>
              </SectionComponent>
              <View style={styles.indicator} />
            </View>
          )}
          <SpaceComponent height={hoaDon.id_ban ? 5 : 15} />

          {/* view giam gia */}
          <View style={[styles.sectionContainer, {}]}>
            <SectionComponent
              styles={[
                styles.section,
                {
                  paddingVertical: 4,
                },
              ]}>
              <RowComponent justify="space-between">
                <TextComponent text="Giảm giá: " styles={styles.text} />
                <TouchableOpacity
                  //disabled={isPaid}
                  style={{
                    width: '40%',
                    alignItems: 'center',
                  }}
                  onPress={handleOpenModalGiamGia}>
                  {discount ? (
                    <TextComponent
                      text={
                        discount > 100 || !isPercent
                          ? `${formatMoney(discount)}`
                          : `${discount}%`
                      }
                      size={15}
                      color={colors.desc}
                    />
                  ) : (
                    <TextComponent
                      text={`Thêm giảm giá`}
                      size={13}
                      color={colors.desc}
                      fontWeight="500"
                      styles={{marginBottom: 2 * 1.3}}
                    />
                  )}
                  <SpaceComponent height={4} />
                  <View
                    style={{
                      width: '85%',
                      height: 1 * 1.5,
                      backgroundColor: colors.desc,
                    }}
                  />
                </TouchableOpacity>
              </RowComponent>
              <SpaceComponent height={5} />
            </SectionComponent>
            {/* end view giam gia */}
          </View>
          <SpaceComponent height={2} />

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
                  text="Danh sách order: "
                  styles={styles.text}
                  fontWeight="bold"
                />
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('ThemMonScreen', {
                      chiTietHoaDon: chiTietHoaDons,
                      hoaDon: hoaDon,
                      tenBan: tenBan,
                      tenKhuVuc: tenKhuVuc,
                      type: type,
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
                    <View style={{width: '50%'}}>
                      <TitleComponent text="Món" />
                    </View>
                    <View>
                      <TitleComponent text="SL" />
                    </View>
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
                <View
                  style={{
                    flex: 1,
                    backgroundColor:
                      chiTietHoaDons.length > 0 ? colors.white : 'transparent',
                  }}>
                  {chiTietHoaDons.length > 0 ? (
                    <FlatList
                      data={chiTietHoaDons}
                      renderItem={renderItem}
                      nestedScrollEnabled={true}
                    />
                  ) : (
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <SpaceComponent height={36} />
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

                // end scroll view
              }
            </SectionComponent>

            {/* end view chi tiet mon an */}
          </View>

          <View
            style={[
              styles.sectionContainer,
              {
                paddingHorizontal: 5,
              },
            ]}>
            {nhanVienThanhToan && isPaid ? (
              <SectionComponent styles={styles.section}>
                <RowComponent justify="space-between">
                  <TextComponent text="NV thanh toán: " styles={styles.text} />
                  <TextComponent
                    text={nhanVienThanhToan?.hoTen ?? 'Nhân viên'}
                    styles={styles.text2}
                  />
                </RowComponent>
              </SectionComponent>
            ) : null}
          </View>
          <View
            style={[
              styles.sectionContainer,
              {
                paddingHorizontal: 5,
              },
            ]}>
            <SectionComponent styles={styles.section}>
              <RowComponent justify="space-between">
                <TextComponent text="Tổng bill: " styles={styles.text} />
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
          <RowComponent
            styles={{marginVertical: 8}}
            justify={isPaid ? 'center' : 'space-between'}>
            {!isPaid ? (
              <ButtonComponent
                title="Thanh toán"
                onPress={() => setVisibleModalPTTT(true)}
                titleFontWeight="500"
                titleSize={14}
                boderRadius={2}
                titleColor={'rgba(60, 138, 86, 1)'}
                styles={[styles.button]}
                bgrColor="rgba(222, 247, 232, 1)"
              />
            ) : (
              <TouchableOpacity
                style={{
                  width: '40%',
                  marginHorizontal: 8,
                  paddingVertical: 8,
                  marginBottom: 8,
                  backgroundColor: '#FF6600',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('InHoaDon', {
                    hoaDon, // Gửi thông tin hóa đơn sang màn hình InHoaDonScreen
                    chiTietHoaDons, // Gửi chi tiết hóa đơn
                    totalFinalBill, // Gửi tổng tiền
                  })
                }
                activeOpacity={0.8}>
                <View style={styles.content}>
                  <FontAwesome name="print" size={18} color="black" />
                  <Text style={{fontSize: 15, color: colors.black, left: 5}}>
                    In Hóa Đơn
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            <ButtonComponent
              title="Đóng"
              onPress={() => navigation.goBack()}
              titleFontWeight="500"
              titleSize={14}
              styles={[styles.button]}
              boderRadius={2}
              titleColor={colors.desc}
              bgrColor={colors.desc2}
            />

            {/* <TouchableOpacity onPress={() =>
              navigation.navigate('InHoaDon', {
                hoaDon, // Gửi thông tin hóa đơn sang màn hình InHoaDonScreen
                chiTietHoaDons, // Gửi chi tiết hóa đơn
                totalFinalBill, // Gửi tổng tiền
              })
            } style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#007bff', borderRadius: 5 }}>
            <Icon name="print" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 16 }}>In hóa đơn</Text>
          </TouchableOpacity> */}
          </RowComponent>
        </ScrollView>
      </View>

      <ModalGiamGia
        visible={visibleModalGiamGia}
        onClose={handleOpenModalGiamGia}
        onValueChange={value => setDiscount(Number(value))}
        discountValue={discount ? discount.toString() : ''}
        onIsPercentChange={value => setIsPercent(value)}
      />
      <ModalPTTT
        visible={visibleModalPTTT}
        onClose={handleOpenModalPTTT}
        totalFinalBill={totalFinalBill}
        hoaDon={hoaDon}
        discount={discount}
        type={'chiTietHoaDon'}
        chiTietHoaDons={chiTietHoaDons}
      />
      <ModalSoLuongMon
        visible={visibleModalSoLuongMon}
        onClose={() => {
          setVisibleModalSoLuongMon(false);
        }}
        item={chiTietSelected}
        hoaDon={hoaDon}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.black,
    left: 0,
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
    marginHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 8,
  },
});

export default ChiTietHoaDonScreen;
