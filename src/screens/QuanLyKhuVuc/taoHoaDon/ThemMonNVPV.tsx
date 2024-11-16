import {useCallback, useEffect, useMemo, useState} from 'react';
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
} from 'react-native';
import {fetchMonAns, MonAn} from '../../../store/Slices/MonAnSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch, RootState} from '../../../store/store';
import {searchMonAn} from '../../../services/api';
import {
  addNewChiTietHoaDon,
  ChiTietHoaDon,
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
import ModalCart from '../../QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ModalCart';
import ItemThemMon from '../../QuanLyThucDon/Hoa/caLam/chiTietHoaDon/ItemThemMon';

interface Props {
  route?: any;
}

const {width: MaxWidth, height: MaxHeight} = Dimensions.get('window');

const ThemMonNVPV = (props: Props) => {
  const {route} = props;
  const {chiTietHoaDon, hoaDon, tenBan, tenKhuVuc} = route.params;

  //console.log(chiTietHoaDon[1].soLuongMon);

  const [visibleModalCart, setVisibleModalCart] = useState(false);
  const [monAns, setMonAns] = useState<{[key: string]: MonAn[]}>({});
  const [monAnsList, setMonAnsList] = useState<MonAn[]>([]);
  const [chiTiets, setChiTiets] = useState<
    {id_monAn: string; soLuongMon: number; tenMon: string; giaMon: string}[]
  >([]);
  const [dataSent, setDataSent] = useState<
    {id_monAn: string; soLuongMon: number; giaTien: string}[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMonAns, setFilteredMonAns] = useState<MonAn[]>([]);
  const [onChange, setOnChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const danhMucs = useSelector((state: RootState) => state.danhMuc.danhMucs);

  //phai tu fetch mon an
  useEffect(() => {
    setIsLoading(true);
    danhMucs.forEach(item => {
      dispatch(fetchMonAns(item._id))
        .then(action => {
          if (fetchMonAns.fulfilled.match(action)) {
            setMonAns(prev => {
              const existing = prev[item._id as string] || [];
              const newItems = action.payload.filter(
                monAn =>
                  !existing.some(
                    existingMonAn => existingMonAn._id === monAn._id,
                  ),
              );
              return {
                ...prev,
                [item._id as string]: [...existing, ...newItems],
              };
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    });
  }, [dispatch, danhMucs]);

  const handleSubmitEditing = async (text: string) => {
    if (text.trim().length !== 0) {
      setIsLoading(true);
      try {
        const data = await searchMonAn(text);
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

  useEffect(() => {
    const allMonAns = Object.values(monAns).flat();
    setMonAnsList(allMonAns as any);
  }, [monAns]);

  useEffect(() => {
    const initialChiTiets = chiTietHoaDon.map((ct: ChiTietHoaDon) => ({
      id_monAn: ct.id_monAn ? ct.id_monAn._id : '',
      soLuongMon: ct.soLuongMon ? (ct.id_monAn ? ct.soLuongMon : 0) : 0,
      tenMon: ct.id_monAn ? ct.id_monAn.tenMon : '',
      giaMon: ct.id_monAn ? ct.id_monAn.giaMonAn : '',
    }));
    setChiTiets(initialChiTiets.filter((item: any) => item.soLuongMon > 0));
    setDataSent(initialChiTiets);
  }, [chiTietHoaDon]);

  const sortedMonAnsList = useMemo(() => {
    return monAnsList && chiTiets
      ? monAnsList.sort((a, b) => {
          const aSoLuong =
            chiTiets.find(ct => ct.id_monAn === a._id)?.soLuongMon || 0;
          const bSoLuong =
            chiTiets.find(ct => ct.id_monAn === b._id)?.soLuongMon || 0;
          return bSoLuong - aSoLuong;
        })
      : [];
  }, [monAnsList]);

  //so luong mon an
  const updateSoLuongMon = useCallback(
    (idMonAn: string, soLuong: number, tenMon: string, giaMon: string) => {
      setChiTiets((prev: any) => {
        const existing = prev.find((item: any) => item.id_monAn === idMonAn);
        if (existing) {
          const updateList = prev.map((item: any) =>
            item.id_monAn === idMonAn
              ? {...item, soLuongMon: Math.max(0, item.soLuongMon + soLuong)}
              : item,
          );

          return updateList.filter((item: any) => item.soLuongMon > 0);
        } else {
          const newList = [
            ...prev,
            {
              id_monAn: idMonAn,
              soLuongMon: Math.max(0, soLuong),
              tenMon,
              giaMon,
            },
          ];
          return newList.filter((item: any) => item.soLuongMon > 0);
        }
      });
      setDataSent((prev: any) => {
        const existing = prev.find((item: any) => item.id_monAn === idMonAn);
        if (existing) {
          const updateList = prev.map((item: any) =>
            item.id_monAn === idMonAn
              ? {...item, soLuongMon: Math.max(0, item.soLuongMon + soLuong)}
              : item,
          );
          return updateList;
        } else {
          const newList = [
            ...prev,
            {
              id_monAn: idMonAn,
              soLuongMon: Math.max(0, soLuong),
              tenMon,
              giaMon,
            },
          ];
          return newList;
        }
      });
    },
    [],
  );
  console.log('render them mon');

  const onMinus = useCallback(
    (idMonAn: string, tenMon: string, giaMon: string) => {
      updateSoLuongMon(idMonAn, -1, tenMon, giaMon);
      setOnChange(true);
    },
    [updateSoLuongMon],
  );
  const onPlus = useCallback(
    (idMonAn: string, tenMon: string, giaMon: string) => {
      updateSoLuongMon(idMonAn, 1, tenMon, giaMon);
      setOnChange(true);
    },
    [updateSoLuongMon],
  );

  //console.log(dataSent);

  const renderItem = ({item}: {item: MonAn}) => {
    const soLuong =
      chiTiets.find((ct: any) => {
        return ct.id_monAn ? ct.id_monAn === item._id : null;
      })?.soLuongMon || 0;
    //console.log(soLuong, item._id);

    return (
      <ItemThemMon
        monAn={item}
        soLuong={soLuong ?? 0}
        onMinus={() =>
          onMinus(
            item._id as string,
            item.tenMon as string,
            item.giaMonAn as unknown as string,
          )
        }
        onPlus={() =>
          onPlus(
            item._id as string,
            item.tenMon as string,
            item.giaMonAn as unknown as string,
          )
        }
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
                onPress={() => {}}
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
                  {chiTiets.length > 0 && (
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
                        text={`${chiTiets.length}`}
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
                    dispatch(
                      addNewChiTietHoaDon({
                        id_hoaDon: hoaDon._id,
                        monAn: dataSent.map((item: any) => ({
                          id_monAn: item.id_monAn,
                          soLuong: item.soLuongMon,
                          giaTien: item.giaMon * item.soLuongMon,
                        })),
                      }),
                    ).then(action => {
                      if (addNewChiTietHoaDon.fulfilled.match(action)) {
                        console.log('Thêm mới Chi Tiết Hóa Đơn thành công');
                        navigation.goBack();
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
        chiTiets={chiTiets}
        visible={visibleModalCart}
        onClose={() => {
          setVisibleModalCart(false);
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
