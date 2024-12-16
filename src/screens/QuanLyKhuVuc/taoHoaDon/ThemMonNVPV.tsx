import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {MonAn} from '../../../store/Slices/MonAnSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch, RootState} from '../../../store/store';
import {searchMonAn} from '../../../services/api';
import {
  addNewChiTietHoaDon,
  ChiTietHoaDon,
  fetchChiTietHoaDon,
} from '../../../store/Slices/ChiTietHoaDonSlice';
import {hoaStyles} from '../../QuanLyThucDon/Hoa/styles/hoaStyles';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import InputComponent from '../../QuanLyThucDon/Hoa/components/InputComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import RowComponent from '../../QuanLyThucDon/Hoa/components/RowComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import TextComponent from '../../QuanLyThucDon/Hoa/components/TextComponent';
import ModalCart from '../../QuanLyCaLam/chiTietHoaDon/ModalCart';
import ItemThemMon from '../../QuanLyCaLam/chiTietHoaDon/ItemThemMon';
import LoadingModal from 'react-native-loading-modal';
import ModalMonTuChonNVPV from './ModalMonTuChonNVPV';
import React from 'react';
import {UserLogin} from '../../../navigation/CustomDrawer';
import {fetchDanhMucVaMonAn} from '../../../store/Thunks/danhMucThunks';

interface Props {
  route?: any;
}

const {width: MaxWidth, height: MaxHeight} = Dimensions.get('window');

const ThemMonNVPV = (props: Props) => {
  const {route} = props;
  const {chiTietHoaDon, hoaDon, tenBan, tenKhuVuc} = route.params;

  const [visibleModalCart, setVisibleModalCart] = useState(false);
  const [visibleModalMonTuChon, setVisibleModalMonTuChon] = useState(false);
  const [monAnsList, setMonAnsList] = useState<MonAn[]>([]);

  const [cartCount, setCartCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMonAns, setFilteredMonAns] = useState<MonAn[]>([]);
  const [onChange, setOnChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const [showNoResult, setShowNoResult] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const monAns = useSelector((state: RootState) => state.monAn.monAns);
  const user: UserLogin = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (monAns.length === 0) {
      dispatch(fetchDanhMucVaMonAn(user?.id_nhaHang?._id));
    }
    setMonAnsList(monAns);
  }, [monAns]);

  const handleSubmitEditing = async (text: string) => {
    if (text.trim().length !== 0) {
      setIsLoading(true);
      try {
        const data = await searchMonAn(text, user?.id_nhaHang?._id);
        if (data.length === 0) {
          setShowNoResult(true);
        } else {
          setShowNoResult(false);
          setFilteredMonAns(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 700);
      }
    } else {
      setFilteredMonAns([]);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFilteredMonAns([]);
      setShowNoResult(false);
    }
  }, [searchQuery]);

  const chiTietsRef = useRef<
    {
      id_monAn?: string;
      soLuongMon: number;
      tenMon: string;
      giaMon: number;
      giaMonAn?: number;
    }[]
  >([]);

  //COMPLETE
  useEffect(() => {
    const initialChiTiets = chiTietHoaDon.map((ct: ChiTietHoaDon) => ({
      id_monAn: ct.id_monAn ? ct.id_monAn : undefined,
      soLuongMon: ct.soLuongMon ? ct.soLuongMon : 0,
      tenMon: ct.monAn ? ct.monAn.tenMon : '',
      giaMon: ct.monAn && ct.id_monAn ? ct.monAn.giaMonAn : undefined,
      giaMonAn: !ct.id_monAn ? ct.monAn.giaMonAn : undefined,
    }));
    chiTietsRef.current = initialChiTiets;
  }, [chiTietHoaDon]);

  //FIND THEO TEN MON
  const sortedMonAnsList = useMemo(() => {
    return monAnsList && chiTietsRef.current
      ? [...monAnsList].sort((a, b) => {
          const aSoLuong =
            chiTietsRef.current.find(ct => ct.id_monAn === a._id)?.soLuongMon ||
            0;
          const bSoLuong =
            chiTietsRef.current.find(ct => ct.id_monAn === b._id)?.soLuongMon ||
            0;
          return bSoLuong - aSoLuong;
        })
      : [];
  }, [monAnsList]);

  const updateQuantityMon = useCallback(
    (idMonAn: string, soLuong: number, tenMon: string, giaMon: number) => {
      const existing = chiTietsRef.current.find(
        (item: any) => item.id_monAn === idMonAn,
      );
      if (existing) {
        chiTietsRef.current = chiTietsRef.current.map(item =>
          item.id_monAn === idMonAn ? {...item, soLuongMon: soLuong} : item,
        );
      } else if (soLuong > 0) {
        chiTietsRef.current = [
          ...chiTietsRef.current,
          {
            id_monAn: idMonAn,
            soLuongMon: soLuong,
            tenMon,
            giaMon,
          },
        ];
      }
      // chiTietsRef.current = chiTietsRef.current.filter(
      //   (item: any) => item.soLuongMon > 0,
      // );
      setCartCount(
        chiTietsRef.current.filter((item: any) => item.soLuongMon > 0).length,
      );
    },
    [],
  );

  const handleSendData = useCallback((data: any) => {
    chiTietsRef.current.push({
      ...data,
    });

    const map = new Map(
      chiTietsRef.current
        .filter((item: any) => item.soLuongMon > 0)
        .map((item: any) => [item.tenMon, item]),
    );
    chiTietsRef.current = Array.from(map.values());
  }, []);

  useEffect(() => {
    setCartCount(
      chiTietsRef.current.filter((item: any) => item.soLuongMon > 0).length,
    );
  }, [chiTietsRef.current]);

  console.log('render them mon');
  //GIAI PHAP TEN MON
  const renderItem = ({item}: {item: MonAn}) => {
    const soLuong =
      chiTietsRef.current.find((ct: any) => {
        return ct.id_monAn ? ct.id_monAn === item._id : null;
      })?.soLuongMon || 0;

    return (
      <ItemThemMon
        monAn={item}
        intialSoLuong={soLuong ?? 0}
        onQuantityChange={updateQuantityMon}
        onChange={val => {
          setOnChange(val);
        }}
      />
    );
  };

  return (
    <>
      <View
        style={[hoaStyles.containerTopping, {backgroundColor: colors.white}]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={[{alignItems: 'center', width: '100%'}]}>
            <TitleComponent text="Thêm món" size={20} color={colors.orange} />
            {hoaDon.id_ban ? (
              <TitleComponent
                text={`${
                  tenBan.length == 1 ? 'Bàn: ' : ''
                }${tenBan} | ${tenKhuVuc}`}
                size={14}
              />
            ) : (
              <TitleComponent text="Mang đi" size={14} color={colors.desc} />
            )}
          </View>
          <SpaceComponent height={10} />
          <View style={{paddingHorizontal: 10, flex: 1}}>
            <View>
              <InputComponent
                value={searchQuery}
                onChangeText={setSearchQuery}
                styles={[
                  {backgroundColor: colors.search, borderRadius: 5, height: 45},
                ]}
                placeholder="Tìm kiếm món ăn"
                allowClear
                leftIcon={
                  <Icon
                    name="search"
                    size={17}
                    color={colors.desc}
                    style={{
                      alignSelf: 'center',
                      marginLeft: 10,
                    }}
                  />
                }
                styleIconX={{
                  alignSelf: 'center',
                  paddingRight: 8,
                }}
                paddingHorizontal={0}
                borderWidth={1 * 1.5}
                bgrColor={colors.white}
                onSubmitEditing={() => handleSubmitEditing(searchQuery)}
              />
            </View>
            <SpaceComponent height={10} />
            <RowComponent justify="space-between" styles={{marginVertical: 6}}>
              <ButtonComponent
                title="Thêm món tự chọn"
                onPress={() => {
                  setVisibleModalMonTuChon(true);
                }}
                styles={{height: 35, paddingHorizontal: 5}}
                titleSize={15}
                bgrColor={'#FEF3EF'}
                titleColor={colors.orange}
                titleFontWeight="600"
              />
              <TouchableOpacity
                onPress={() => setVisibleModalCart(true)}
                activeOpacity={0.7}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="shopping-cart"
                    size={32}
                    color={colors.desc}
                    style={{
                      paddingRight: 8,
                    }}
                  />
                  {cartCount > 0 && (
                    <View
                      style={{
                        backgroundColor: colors.orange,
                        width: 16,
                        height: 16,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        borderRadius: 8,
                      }}>
                      <TextComponent
                        text={`${cartCount}`}
                        styles={{
                          textAlign: 'center',
                        }}
                        fontWeight="600"
                        size={11}
                        color={colors.white}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </RowComponent>
            <View
              style={{
                height: MaxHeight * 0.68,
                paddingVertical: 8,
              }}>
              {isLoading ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <ActivityIndicator size="large" color={colors.orange} />
                </View>
              ) : filteredMonAns.length > 0 ? (
                <FlatList
                  data={filteredMonAns}
                  renderItem={renderItem}
                  keyExtractor={item => item._id as string}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <SpaceComponent height={6} />}
                  nestedScrollEnabled={true}
                />
              ) : showNoResult ? (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TextComponent text="Không tìm thấy món ăn" />
                </View>
              ) : (
                <FlatList
                  data={sortedMonAnsList}
                  renderItem={renderItem}
                  keyExtractor={item => item._id as string}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <SpaceComponent height={6} />}
                  nestedScrollEnabled={true}
                />
              )}
            </View>
            <RowComponent
              justify="space-between"
              styles={{paddingHorizontal: 5}}>
              <ButtonComponent
                title="Đóng"
                onPress={() => {
                  navigation.goBack();
                }}
                styles={styles.button}
                titleSize={15}
                bgrColor={colors.desc2}
                titleFontWeight="600"
              />
              <ButtonComponent
                title="Thêm món"
                onPress={() => {
                  if (onChange) {
                    setIsLoadingModal(true);
                    dispatch(
                      addNewChiTietHoaDon({
                        id_hoaDon: hoaDon._id,
                        monAn: chiTietsRef.current.map((item: any) => ({
                          id_monAn: item.id_monAn ? item.id_monAn : null,
                          tenMon: !item.id_monAn ? item.tenMon : null,
                          soLuong: item.soLuongMon,
                          giaTien: item.id_monAn
                            ? item.giaMon * item.soLuongMon
                            : item.giaMonAn * item.soLuongMon,
                          giaMonAn: !item.id_monAn ? item.giaMonAn : null,
                        })),
                      }),
                    ).then(action => {
                      if (addNewChiTietHoaDon.fulfilled.match(action)) {
                        ToastAndroid.show(
                          'Thêm món thành công',
                          ToastAndroid.SHORT,
                        );
                        dispatch(fetchChiTietHoaDon(hoaDon._id));
                        setTimeout(() => {
                          navigation.goBack();
                          setIsLoadingModal(false);
                        }, 500);
                      } else {
                        ToastAndroid.show(
                          'Thêm món thất bại',
                          ToastAndroid.SHORT,
                        );
                        setTimeout(() => {
                          setIsLoadingModal(false);
                        }, 500);
                      }
                    });
                  } else {
                    navigation.goBack();
                  }
                }}
                styles={styles.button}
                titleSize={15}
                bgrColor={'#FEF3EF'}
                titleColor={colors.orange}
                titleFontWeight="600"
              />
            </RowComponent>
          </View>
        </ScrollView>
      </View>
      <ModalCart
        tenBan={tenBan}
        tenKhuVuc={tenKhuVuc}
        chiTiets={chiTietsRef.current.filter(
          (item: any) => item.soLuongMon > 0,
        )}
        visible={visibleModalCart}
        onClose={() => {
          setVisibleModalCart(false);
        }}
      />
      <LoadingModal
        modalVisible={isLoadingModal}
        darkMode={false}
        color={colors.orange}
      />
      <ModalMonTuChonNVPV
        visible={visibleModalMonTuChon}
        onClose={() => {
          setVisibleModalMonTuChon(false);
        }}
        onSendData={handleSendData}
        onChange={val => {
          setOnChange(val);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    width: '40%',
    height: 35,
  },
});

export default ThemMonNVPV;
