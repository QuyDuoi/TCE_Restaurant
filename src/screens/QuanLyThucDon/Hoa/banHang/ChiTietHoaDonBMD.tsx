import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ChiTietHoaDon} from '../../../../store/Slices/ChiTietHoaDonSlice';
import {hoaStyles} from '../styles/hoaStyles';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import RowComponent from '../components/RowComponent';
import TitleComponent from '../components/TitleComponent';
import SectionComponent from '../components/SectionComponent';
import ButtonComponent from '../components/ButtonComponent';
import {formatDate, formatMoney} from '../utils/formatUtils';
import TextComponent from '../components/TextComponent';
import ModalGiamGia from '../caLam/chiTietHoaDon/ModalGiamGia';
import ModalPTTTBMD from './ModalPTTTBMD';
import ModalSoLuongBMD from './ModalSoLuongBMD';
import ItemChiTietHoaDonBMD from './ItemChiTietHoaDonBMD';
import Icon from 'react-native-vector-icons/FontAwesome';
import {VirtualizedList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import LoadingModal from 'react-native-loading-modal';

const {height: ScreenHeight} = Dimensions.get('window');

interface Props {
  route: any;
}

const ChiTietHoaDonBMD = (props: Props) => {
  const {chiTietHoaDons, onUpdateChiTiets, onChangeChiTiets} =
    props.route.params;

  const [visibleModalGiamGia, setVisibleModalGiamGia] = useState(false);
  const [visibleModalSoLuongMonBMD, setVisibleModalSoLuongMonBMD] =
    useState(false);
  const [visibleModalPTTTBMD, setVisibleModalPTTTBMD] = useState(false);
  const [onPaid, setOnPaid] = useState(false);
  const [discount, setDiscount] = useState<number | null>(null);
  const [isPercent, setIsPercent] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [totalBill, setTotalBill] = useState(0);
  const [totalFinalBill, setTotalFinalBill] = useState(0);

  const [chiTietHoaDonList, setChiTietHoaDonList] = useState<any[]>([]);
  const [chiTietSelected, setChiTietSelected] = useState<ChiTietHoaDon | null>(
    null,
  );

  const navigation = useNavigation<any>();

  const nhanviens = useSelector((state: RootState) => state.nhanVien.nhanViens);
  const calams = useSelector((state: RootState) => state.calam.caLams);

  let totalFinalBillCal = () => {
    if (isPercent) {
      return totalBill - (totalBill * (discount || 0)) / 100;
    } else {
      return totalBill - (discount || 0);
    }
  };

  let discountCalculate = () => {
    if (isPercent) {
      return ((discount || 0) * totalBill) / 100;
    } else {
      return discount || 0;
    }
  };

  useEffect(() => {
    setChiTietHoaDonList(chiTietHoaDons);
  }, []);

  useEffect(() => {
    const total = chiTietHoaDonList.reduce((total: number, item: any) => {
      return (total += item.giaTien);
    }, 0);
    setTotalBill(total);
  }, [totalBill, chiTietHoaDonList]);

  useEffect(() => {
    setTotalFinalBill(totalFinalBillCal());
  }, [totalFinalBillCal, isPercent, discount]);

  useEffect(() => {
    if (onPaid) {
      onUpdateChiTiets?.([]);
      onChangeChiTiets?.(true);
      setTimeout(() => {
        onChangeChiTiets?.(false);
      }, 500);
    }
  }, [onPaid]);

  //modal so luong mon khi thay doi
  const updateChiTiets = useCallback(
    (updatedItem: any) => {
      const updatedChiTietHoaDons = chiTietHoaDonList.map((item: any) =>
        item.id_monAn === updatedItem.id_monAn ? updatedItem : item,
      );

      onUpdateChiTiets?.(updatedItem);
      onChangeChiTiets?.(true);
      setTimeout(() => {
        onChangeChiTiets?.(false);
      }, 500);
      setChiTietHoaDonList(
        updatedChiTietHoaDons.filter(item => item.soLuongMon > 0),
      );
      onUpdateChiTiets?.(
        updatedChiTietHoaDons.filter(item => item.soLuongMon > 0),
      );
    },
    [chiTietHoaDonList],
  );

  const handleOpenModalGiamGia = useCallback(() => {
    setVisibleModalGiamGia(prev => !prev);
  }, []);

  const handleOpenModalPTTTBMD = useCallback(() => {
    if (chiTietHoaDonList.length === 0) {
      ToastAndroid.show('Không có món ăn nào', ToastAndroid.SHORT);
    } else {
      setVisibleModalPTTTBMD(prev => !prev);
    }
  }, [chiTietHoaDonList]);

  const handleOpenModalSoLuongMonBMD = useCallback(
    (item: ChiTietHoaDon) => {
      setChiTietSelected(item);
      setVisibleModalSoLuongMonBMD(true);
    },
    [setChiTietSelected],
  );

  const handleDeleteItemChiTiet = useCallback(
    (itemSelected: any) => {
      const updatedChiTietHoaDons = chiTietHoaDonList.filter(
        item => item.id_monAn !== itemSelected.id_monAn,
      );
      onUpdateChiTiets?.(
        updatedChiTietHoaDons.filter(item => item.soLuongMon > 0),
      );
      setChiTietHoaDonList(
        updatedChiTietHoaDons.filter(item => item.soLuongMon > 0),
      );
      onChangeChiTiets?.(true);
      setTimeout(() => {
        onChangeChiTiets?.(false);
      }, 500);
    },
    [chiTietHoaDonList],
  );

  //console.log(chiTietHoaDonList);

  // const nhanVienThanhToan = nhanviens.find(
  //   item => item._id === hoaDon?.id_nhanVien,
  // );

  const renderItem = ({item}: {item: any}) => {
    return (
      <View>
        {item.id_monAn ? (
          <ItemChiTietHoaDonBMD
            onLongPress={() => {
              handleOpenModalSoLuongMonBMD(item);
            }}
            nameMonAn={item.tenMon}
            soLuong={item.soLuongMon}
            gia={item?.giaTien}
            key={item._id}
          />
        ) : null}
      </View>
    );
  };

  const renderHiddenItem = ({item}: {item: any}) => {
    return (
      <View style={hoaStyles.hiddenDeleteView}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={hoaStyles.buttonDelete}
          onPress={() => {
            handleDeleteItemChiTiet(item);
          }}>
          <Icon name="trash" size={20} color={colors.white} />
        </TouchableOpacity>
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
        <SpaceComponent height={15} />
        <TouchableOpacity
          onPress={() => {
            //reset chi tiet
            setIsLoadingModal(true);
            onUpdateChiTiets?.([]);
            onChangeChiTiets?.(true);
            setTimeout(() => {
              onChangeChiTiets?.(false);
              setIsLoadingModal(false);
            }, 500);
            setChiTietHoaDonList([]);
            onUpdateChiTiets?.([]);
          }}
          style={{
            position: 'absolute',
            top: 25,
            right: 25,
            zIndex: 1,
          }}>
          <Icon name="refresh" size={20} color={colors.black} />
        </TouchableOpacity>
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
          <SpaceComponent height={15} />
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
                    text={onPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    fontWeight={'500'}
                    color={onPaid ? colors.status : colors.status2}
                  />
                </RowComponent>
              </SectionComponent>
              <View style={styles.indicator} />
            </View>
            <SpaceComponent height={10} />
          </View>

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
                  style={{
                    width: '40%',
                    alignItems: 'center',
                  }}
                  onPress={handleOpenModalGiamGia}>
                  {discount ? (
                    <TextComponent
                      text={discount <= 100 ? `${discount}%` : `${discount}`}
                      size={15}
                      color={colors.desc}
                    />
                  ) : (
                    <TextComponent
                      text="Thêm giảm giá"
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
                  chiTietHoaDonList.length <= 4 ? 'auto' : ScreenHeight * 0.4,
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
                  onPress={() => {}}>
                  <TextComponent
                    text="In hoa don"
                    color={colors.blue2}
                    size={16}
                  />
                </TouchableOpacity>
              </RowComponent>
              <SpaceComponent height={5} />
              {chiTietHoaDonList.length > 0 ? (
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
                      chiTietHoaDonList.length > 0
                        ? colors.white
                        : 'transparent',
                  }}>
                  {chiTietHoaDonList.length > 0 ? (
                    <SwipeListView
                      data={chiTietHoaDonList}
                      renderItem={renderItem}
                      nestedScrollEnabled={true}
                      keyExtractor={(item, index) => index.toString()}
                      renderHiddenItem={renderHiddenItem}
                      disableRightSwipe={true}
                      rightOpenValue={-75}
                      stopRightSwipe={-105}
                      previewRowKey={'0'}
                      previewOpenValue={-40}
                      previewOpenDelay={2000}
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
            {onPaid ? (
              <SectionComponent styles={styles.section}>
                <RowComponent justify="space-between">
                  <TextComponent text="NV thanh toán: " styles={styles.text} />
                  <TextComponent text="Nhân viên" styles={styles.text2} />
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
            justify={!onPaid ? 'space-between' : 'center'}>
            {!onPaid && (
              <ButtonComponent
                title="Thanh toán"
                onPress={handleOpenModalPTTTBMD}
                titleFontWeight="500"
                titleSize={14}
                boderRadius={2}
                titleColor={'rgba(60, 138, 86, 1)'}
                styles={[styles.button]}
                bgrColor="rgba(222, 247, 232, 1)"
              />
            )}

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
        discountValue={discount ? discount.toString() : ''}
        onIsPercentChange={value => setIsPercent(value)}
      />
      <ModalPTTTBMD
        visible={visibleModalPTTTBMD}
        onClose={handleOpenModalPTTTBMD}
        totalFinalBill={totalFinalBill}
        discount={discountCalculate()}
        chiTiets={chiTietHoaDonList}
        onPaid={value => setOnPaid(value)}
      />
      <ModalSoLuongBMD
        visible={visibleModalSoLuongMonBMD}
        onClose={() => {
          setVisibleModalSoLuongMonBMD(false);
        }}
        item={chiTietSelected}
        updateItem={updateChiTiets}
      />
      <LoadingModal modalVisible={isLoadingModal} color={colors.orange} />
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

export default ChiTietHoaDonBMD;
