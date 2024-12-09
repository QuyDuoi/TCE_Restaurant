import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {MonAn} from '../../../../store/Slices/MonAnSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AppDispatch, RootState} from '../../../../store/store';
import {hoaStyles} from '../styles/hoaStyles';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import RowComponent from '../components/RowComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';
import {Dimensions} from 'react-native';
import {DanhMuc} from '../../../../store/Slices/DanhMucSlice';
import CardComponent from '../components/CardComponent';
import {searchMonAn} from '../../../../services/api';
import {useRef} from 'react';
import ItemThemMonBanHang from './ItemThemMonBanHang';
import ModalMonTuChon from './ModalMonTuChon';

const MaxHeight = Dimensions.get('window').height;

const QuanLyBanHang = () => {
  const [cartCount, setCartCount] = useState(0);

  const [filteredMonAns, setFilteredMonAns] = useState<MonAn[]>([]);

  const [danhMucList, setDanhMucList] = useState<DanhMuc[]>([]);
  const [idDanhMuc, setIdDanhMuc] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isFocused, setIsFocused] = useState(false);
  const [dsTimKiem, setDsTimKiem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onChangeChiTiets, setOnChangeChiTiets] = useState(false);
  const [MaxToRender, setMaxToRender] = useState(7);
  const [isEndReached, setIsEndReached] = useState(false);

  const [visibleModalMonTuChon, setVisibleModalMonTuChon] = useState(false);
  const navigation = useNavigation<any>();

  const monAns = useSelector((state: RootState) => state.monAn.monAns);
  const danhMucs = useSelector((state: RootState) => state.danhMuc.danhMucs);

  useEffect(() => {
    if (danhMucs.length > 0) {
      const danhMucList = [...danhMucs];
      danhMucList.unshift({
        _id: 'all',
        tenDanhMuc: 'Tất cả',
        id_nhaHang: danhMucs[0].id_nhaHang,
      });
      setDanhMucList(danhMucList);
      setFilteredMonAns(monAns);
    } else if (danhMucs.length === 0) {
      danhMucList.unshift({
        _id: 'all',
        tenDanhMuc: 'Tất cả',
        id_nhaHang: '',
      });
      setDanhMucList(danhMucList);
      setFilteredMonAns([]);
    }
  }, [danhMucs]);

  useEffect(() => {
    const filterMonAns = monAns.filter(monAn => {
      if (idDanhMuc === 'all') {
        return true;
      }
      return monAn.id_danhMuc === idDanhMuc;
    });
    setFilteredMonAns(filterMonAns);
  }, [idDanhMuc, monAns]);

  console.log('render ban hang 1');

  useFocusEffect(
    useCallback(() => {
      setOnChangeChiTiets(false);
    }, []),
  );

  const chiTietsRef = useRef<
    {
      id_monAn?: string;
      soLuongMon: number;
      tenMon: string;
      giaTien: number;
      ghiChu?: string;
      giaMonAn?: number;
    }[]
  >([]);

  const handleDataMonTuChon = useCallback(
    (data: any) => {
      if (!onChangeChiTiets) {
        chiTietsRef.current.push({
          ...data,
        });
        //GIAI PHAP TRUNG LAP TEN MON AN TU CHON(NOT ID)
        const map = new Map(
          chiTietsRef.current
            .filter((item: any) => item.soLuongMon > 0)
            .map((item: any) => [item.tenMon, item]),
        );
        chiTietsRef.current = Array.from(map.values());
        setCartCount(map.size);
      }
    },
    [onChangeChiTiets],
  );

  //GIAI PHAP TY FIX
  useEffect(() => {
    setCartCount(
      chiTietsRef.current.filter((item: any) => item.soLuongMon > 0).length,
    );
  }, [chiTietsRef.current]);

  //load more danh sach (not mutate)
  const loadMoreListMonAns = () => {
    setMaxToRender(prev => prev + 7);
  };

  //update so luong mon
  const updateQuantityMon = useCallback(
    (
      idMonAn: string,
      newQuantity: number,
      tenMon: string,
      giaTien: number,
      ghiChu?: string,
    ) => {
      const existing = chiTietsRef.current.find(
        (item: any) => item.id_monAn === idMonAn,
      );
      if (existing) {
        chiTietsRef.current = chiTietsRef.current.map(item =>
          item.id_monAn === idMonAn
            ? {...item, soLuongMon: newQuantity, giaTien: giaTien * newQuantity}
            : item,
        );
      } else {
        chiTietsRef.current.push({
          id_monAn: idMonAn,
          soLuongMon: newQuantity,
          tenMon,
          giaTien: giaTien * newQuantity,
          ghiChu: ghiChu ?? '',
        });
      }
      chiTietsRef.current = chiTietsRef.current.filter(
        (item: any) => item.soLuongMon > 0,
      );
      setCartCount(
        chiTietsRef.current.filter((item: any) => item.soLuongMon > 0).length,
      );
    },
    [],
  );

  const renderItemDanhMuc = ({item, index}: {item: DanhMuc; index: number}) => {
    return (
      <CardComponent
        onPress={() => {
          setIdDanhMuc(item._id as string);
          setSelectedIndex(index);
        }}
        styles={{
          borderRadius: 5,
          backgroundColor:
            selectedIndex === index ? colors.orange : colors.orange2,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}>
        <TextComponent
          text={item.tenDanhMuc}
          color={selectedIndex === index ? colors.white : colors.desc}
          size={15}
        />
      </CardComponent>
    );
  };

  const renderItem = ({item}: {item: MonAn}) => {
    const soLuong =
      chiTietsRef.current.find((ct: any) => {
        return ct.id_monAn ? ct.id_monAn === item._id : null;
      })?.soLuongMon || 0;

    return (
      <ItemThemMonBanHang
        monAn={item}
        intialSoLuong={soLuong}
        onQuantityChange={updateQuantityMon}
        //CAP NHAT BEN ITEM
        onChangeChiTiets={onChangeChiTiets}
      />
    );
  };

  const id_nhaHang = '66fab50fa28ec489c7137537';
  const timKiemMonAn = async (text: string) => {
    if (text.trim().length > 0) {
      setIsLoading(true);
      try {
        const data = await searchMonAn(text, id_nhaHang);
        setDsTimKiem(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setDsTimKiem([]);
    }
  };

  const debounceTimKiemMonAn = () => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return (text: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        timKiemMonAn(text);
      }, 1000); // Đợi 1 giây trước khi gọi hàm
    };
  };

  const onChangeText = debounceTimKiemMonAn();

  return (
    <>
      <View
        style={[hoaStyles.containerTopping, {backgroundColor: colors.white}]}>
        <SpaceComponent height={10} />
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F1F2FC',
              marginHorizontal: 10,
              borderRadius: 10,
              borderWidth: isFocused ? 1 : 0, // Thay đổi border khi focus
              borderColor: isFocused ? '#9E81C3' : '#ccc', // Màu sắc border khi focus
              elevation: 10,
            }}>
            <Icon
              name="search"
              size={18}
              color={'black'}
              style={{paddingHorizontal: 15}}
            />
            <TextInput
              onChangeText={text => onChangeText(text)}
              placeholder="Tìm Kiếm món ăn"
              style={{width: '85%', fontSize: 15}}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
              onPress={() => {
                navigation.navigate('ChiTietHoaDonBMD', {
                  chiTietHoaDons: chiTietsRef.current,
                  onUpdateChiTiets: (updatedItems: any) => {
                    chiTietsRef.current = updatedItems;
                    //setChiTiets(updatedItems);
                  },
                  onChangeChiTiets: (value: boolean) => {
                    setOnChangeChiTiets(value);
                  },
                });
              }}
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
          <FlatList
            data={danhMucList}
            renderItem={renderItemDanhMuc}
            horizontal={true}
            keyExtractor={item => item._id as string}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <SpaceComponent width={10} />}
          />
        </View>
        <View
          style={{
            paddingVertical: 8,
            flex: 1,
            paddingHorizontal: 8,
          }}>
          {isLoading ? (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <ActivityIndicator size="large" color={colors.orange} />
            </View>
          ) : dsTimKiem.length > 0 ? (
            <FlatList
              data={dsTimKiem}
              renderItem={renderItem}
              keyExtractor={item => item._id as string}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <SpaceComponent height={6} />}
              nestedScrollEnabled={true}
            />
          ) : filteredMonAns.length > 0 ? (
            <FlatList
              data={filteredMonAns.slice(0, MaxToRender)}
              renderItem={renderItem}
              keyExtractor={item => item._id as string}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <SpaceComponent height={6} />}
              nestedScrollEnabled={true}
              onStartReachedThreshold={0.1}
              onStartReached={() => {
                setIsEndReached(false);
              }}
              onEndReached={() => {
                setIsEndReached(true);
                loadMoreListMonAns();
              }}
              ListFooterComponent={() =>
                isEndReached &&
                MaxToRender < filteredMonAns.length && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 100,
                    }}>
                    <ActivityIndicator size="large" color={colors.orange} />
                  </View>
                )
              }
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <TextComponent text="Không có món ăn nào" />
            </View>
          )}
        </View>
      </View>
      <ModalMonTuChon
        visible={visibleModalMonTuChon}
        onClose={() => setVisibleModalMonTuChon(false)}
        onSendData={handleDataMonTuChon}
      />
    </>
  );
};

export default QuanLyBanHang;
