import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import CardComponent from '../components/CardComponent';
import RowComponent from '../components/RowComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../contants/hoaColors';
import SectionComponent from '../components/SectionComponent';
import ItemCaLam from './ItemCaLam';
import SpaceComponent from '../components/SpaceComponent';
import {CaLamModel, NhanVienModel} from '../modelTests/modelTest';
import {caLamData, nhanVienData} from '../modelTests/sampleData';
import {useNavigation} from '@react-navigation/native';
import ModalComponent from '../components/ModalComponent';
import DatePicker from 'react-native-date-picker';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {CaLam, fetchCaLam} from '../../../../store/CaLamSlice';
import {fetchNhanViens, NhanVienSlice} from '../../../../store/NhanVienSlice';
import {formatDate} from '../utils/formatUtils';
import fetchHoaDonTheoCaLam, {
  fetchHoaDonTheoNhaHang,
} from '../../../../store/HoaDonSlice';
import ModalDate from './ModalDate';

interface Props {
  setFilterHandler: any;
}
const QuanLyCaLam = (props: Props) => {
  const {setFilterHandler} = props;

  const idNhaHang = '66fab50fa28ec489c7137537';

  console.log('render quan ly ca lam');

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const [caLamFilter, setCaLamFilter] = useState<
    (CaLam & {nv: NhanVienSlice})[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);

  //thuc thi nut loc ben drawer
  useEffect(() => {
    setFilterHandler(() => setIsVisibleDialog.bind(null, true));
  }, [setFilterHandler]);

  useEffect(() => {
    //dispatch(fetchHoaDonTheoNhaHang(idNhaHang) as any);
    dispatch(fetchNhanViens() as any);
    dispatch(fetchCaLam() as any);
  }, [dispatch]);
  //////////
  const caLams = useSelector((state: RootState) => state.calam.caLams);
  //console.log(caLams[1].id_hoaDon);

  const sortedCaLam = (caLams: CaLam[]) => {
    return [...caLams].sort((a, b) => {
      return new Date(b.batDau).getTime() - new Date(a.batDau).getTime();
    });
  };

  //console.log(caLams);

  //console.log(caLamFilter);

  useEffect(() => {
    const filtered = caLams.filter(caLam => {
      const caLamDate = new Date(caLam.batDau).toLocaleDateString('vi-VN');
      //console.log(caLamDate);

      return caLamDate === date?.toLocaleDateString('vi-VN');
    });
    //console.log(filtered);

    const sortedCaLam = filtered.sort((a, b) => {
      return (
        new Date(b.batDau).getTime() - new Date(a.ketThuc as any).getTime()
      );
    });
    setCaLamFilter(sortedCaLam as any);
  }, [date]);

  const renderItem = ({item}: {item: CaLam & {nv: NhanVienSlice}}) => {
    return (
      <ItemCaLam
        batDau={item.batDau.toLocaleString('vi-VN')}
        ketThuc={item.ketThuc?.toLocaleString('vi-VN')}
        nhanVienMoCa={item.id_nhanVien.hoTen}
        onPress={() => {
          // console.log(item.nv._id);

          navigation.navigate('ChiTietCaLam', {caLam: item});
        }}
      />
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setDate(null);
      dispatch(fetchCaLam() as any);
      setRefreshing(false);
    }, 2000);
  };

  const closeFilterDialog = () => {
    setIsVisibleDialog(false);
  };

  return (
    <>
      <View style={{backgroundColor: colors.gray}}>
        <View style={[hoaStyles.container, {marginBottom: 20}]}>
          <SpaceComponent height={10} />
          <View style={{flex: 1}}>
            {date && caLamFilter.length > 0 ? (
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
            ) : caLams.length > 0 && !date ? (
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
      <ModalDate
        visible={isVisibleDialog}
        onClose={closeFilterDialog}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onConfirm={() => {
          setDate(selectedDate);
          closeFilterDialog();
        }}
      />
    </>
  );
};

export default QuanLyCaLam;
