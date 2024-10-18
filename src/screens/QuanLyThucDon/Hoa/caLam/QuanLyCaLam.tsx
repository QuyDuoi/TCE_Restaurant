import {
  View,
  Text,
  ScrollView,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
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
import {fetchNhanViens, NhanVien} from '../../../../store/NhanVienSlice';
import {formatDate} from '../utils/formatUtils';
import {fetchHoaDon} from '../../../../store/HoaDonSlice';
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

  const [caLamFilter, setCaLamFilter] = useState<(CaLam & {nv: NhanVien})[]>(
    [],
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  //////////
  const caLams = useSelector((state: RootState) => state.calam.caLams);
  //console.log(caLams);

  //thuc thi nut loc ben drawer
  useEffect(() => {
    setFilterHandler(() => setIsVisibleDialog.bind(null, true));
  }, [setFilterHandler]);

  useEffect(() => {
    dispatch(fetchCaLam() as any);
  }, []);
  // useEffect(() => {
  //   const fetchAllCaLams = async () => {
  //     const allCaLamsPromise = nhanViens.map(nv =>
  //       dispatch(fetchCaLam(nv._id) as any),
  //     );
  //     const allCaLamsResponse = await Promise.all(allCaLamsPromise);
  //     const allCaLams = allCaLamsResponse.flatMap((response, index) =>
  //       response.payload.map((caLam: CaLam) => {
  //         return {
  //           ...caLam,
  //           nv: nhanViens[index],
  //         };
  //       }),
  //     );
  //     const sortedCaLams = [...allCaLams].sort((a, b) => {
  //       return new Date(b.batDau).getTime() - new Date(a.batDau).getTime();
  //     });
  //     setCaLam(sortedCaLams);
  //     setCaLamFilter(sortedCaLams);
  //   };
  //   if (nhanViens.length > 0) {
  //     fetchAllCaLams();
  //   }
  //   //console.log('render');
  // }, [nhanViens, dispatch]);

  // useEffect(() => {
  //   const sortedCaLams = [...caLams].sort((a, b) => {
  //     return new Date(b.batDau).getTime() - new Date(a.batDau).getTime();
  //   });

  //   //console.log(sortedCaLams);
  //   setCaLam(sortedCaLams as any);
  //   setCaLamFilter(sortedCaLams as any);
  // }, [caLams]);

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

  const renderItem = ({item}: {item: CaLam & {nv: NhanVien}}) => {
    return (
      <ItemCaLam
        batDau={item.batDau.toLocaleString('vi-VN')}
        ketThuc={item.ketThuc?.toLocaleString('vi-VN')}
        nhanVienMoCa={item.nv.hoTen}
        onPress={() => {
          // console.log(item.nv._id);

          navigation.navigate('ChiTietCaLam', {caLam: item});
        }}
      />
    );
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
              />
            ) : caLams.length > 0 && !date ? (
              <FlatList
                data={sortedCaLam(caLams) as any}
                renderItem={renderItem}
                keyExtractor={item => item._id as string}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TitleComponent
                  text="Không có ca làm nào trong ngày này"
                  color={colors.desc}
                />
              </View>
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
