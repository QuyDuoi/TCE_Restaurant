import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MonAn} from '../../../../store/Slices/MonAnSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AppDispatch, RootState} from '../../../../store/store';
import ChiTietHoaDon from '../../../../services/models/ChiTietHoaDonModel';
import ItemThemMon from '../caLam/chiTietHoaDon/ItemThemMon';
import {hoaStyles} from '../styles/hoaStyles';
import {colors} from '../contants/hoaColors';
import TitleComponent from '../components/TitleComponent';
import SpaceComponent from '../components/SpaceComponent';
import InputComponent from '../components/InputComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import RowComponent from '../components/RowComponent';
import ButtonComponent from '../components/ButtonComponent';
import TextComponent from '../components/TextComponent';
import {Dimensions} from 'react-native';
import {DanhMuc} from '../../../../store/Slices/DanhMucSlice';
import CardComponent from '../components/CardComponent';

const MaxHeight = Dimensions.get('window').height;

const QuanLyBanHang = () => {
  const [visibleModalCart, setVisibleModalCart] = useState(false);

  const [chiTiets, setChiTiets] = useState<
    {id_monAn: string; soLuongMon: number; tenMon: string; giaTien: number}[]
  >([]);

  const [searchQuery, setSearchQuery] = useState('');

  const [filteredMonAns, setFilteredMonAns] = useState<MonAn[]>([]);
  const [danhMucList, setDanhMucList] = useState<DanhMuc[]>([]);
  const [idDanhMuc, setIdDanhMuc] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        return monAns;
      }
      return monAn.id_danhMuc === idDanhMuc;
    });
    setFilteredMonAns(filterMonAns);
    //console.log(filterMonAns);
  }, [idDanhMuc]);

  //so luong mon an

  const updateSoLuongMon = useCallback(
    (idMonAn: string, soLuong: number, tenMon: string, giaTien: number) => {
      setChiTiets((prev: any) => {
        const existing = prev.find((item: any) => item.id_monAn === idMonAn);
        if (existing) {
          const updateList = prev.map((item: any) =>
            item.id_monAn === idMonAn
              ? {
                  ...item,
                  soLuongMon: Math.max(0, item.soLuongMon + soLuong),
                  giaTien: giaTien * Math.max(0, item.soLuongMon + soLuong),
                }
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
              giaTien: giaTien * Math.max(1, soLuong),
              //giaMon,
            },
          ];
          return newList.filter((item: any) => item.soLuongMon > 0);
        }
      });
    },
    [],
  );
  console.log('render ban hang');

  const onMinus = useCallback(
    (idMonAn: string, tenMon: string, giaTien: number) => {
      updateSoLuongMon(idMonAn, -1, tenMon, giaTien);
    },
    [updateSoLuongMon],
  );
  const onPlus = useCallback(
    (idMonAn: string, tenMon: string, giaTien: number) => {
      updateSoLuongMon(idMonAn, 1, tenMon, giaTien);
    },
    [updateSoLuongMon],
  );

  const renderItemDanhMuc = ({item, index}: {item: DanhMuc; index: number}) => {
    return (
      <CardComponent
        onPress={() => {
          setIdDanhMuc(item._id as string);
          setSelectedIndex(index);
        }}
        styles={{
          borderRadius: 3,
          backgroundColor:
            selectedIndex === index ? colors.orange : colors.orange2,
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 4,
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
      chiTiets.find((ct: any) => {
        return ct.id_monAn ? ct.id_monAn === item._id : null;
      })?.soLuongMon || 0;

    return (
      <ItemThemMon
        monAn={item}
        soLuong={soLuong ?? 0}
        onMinus={() => {
          //console.log(giaMon);

          onMinus(item._id as string, item.tenMon as string, item.giaMonAn);
        }}
        onPlus={() => {
          //console.log(giaMon);
          onPlus(item._id as string, item.tenMon as string, item.giaMonAn);
        }}
      />
    );
  };

  return (
    <>
      <View
        style={[hoaStyles.containerTopping, {backgroundColor: colors.white}]}>
        <SpaceComponent height={20} />
        <View style={{paddingHorizontal: 10}}>
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
              //onSubmitEditing={() => handleSubmitEditing(searchQuery)}
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
              onPress={() => {
                navigation.navigate('ChiTietHoaDonBMD', {
                  chiTietHoaDons: chiTiets,
                  onUpdateChiTiets: (updatedItems: any) => {
                    setChiTiets(updatedItems);
                    //console.log('updatedItem', chiTiets);
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
              height: 30,
              flexDirection: 'row',
            }}>
            <FlatList
              data={danhMucList}
              renderItem={renderItemDanhMuc}
              horizontal={true}
              keyExtractor={item => item._id as string}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <SpaceComponent width={10} />}
            />
          </View>
        </View>
        <View
          style={{
            paddingVertical: 8,
            flex: 1,
            paddingHorizontal: 8,
          }}>
          {filteredMonAns.length > 0 ? (
            <FlatList
              data={filteredMonAns}
              renderItem={renderItem}
              keyExtractor={item => item._id as string}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <SpaceComponent height={6} />}
              nestedScrollEnabled={true}
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

export default QuanLyBanHang;
