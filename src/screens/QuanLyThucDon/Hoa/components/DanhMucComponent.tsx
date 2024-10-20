import {
  View,
  Text,
  ScrollView,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import ItemDanhMuc from '../lists/ItemDanhMuc';
import ItemMonAn from '../lists/ItemMonAn';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';
import SettingModaDanhMuc from '../caLam/SettingModaDanhMuc';
import {fetchMonAns, MonAn} from '../../../../store/MonAnSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {DanhMuc, fetchDanhMucs} from '../../../../store/DanhMucSlice';
import unorm from 'unorm';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  searchQueryMonAn: string;
}

const DanhMucComponent = (props: Props) => {
  const {searchQueryMonAn} = props;
  console.log('render danh muc component');

  const [isLoading, setIsLoading] = useState(true);
  const [filterDanhMucList, setFilterDanhMucList] = useState<DanhMuc[]>([]);
  const [expandedDanhMuc, setExpandedDanhMuc] = useState<string[]>([]);
  const [monAnList, setMonAnList] = useState<{[key: string]: MonAn[]}>({});
  const [monAnCounts, setMonAnCounts] = useState<{[key: string]: number}>({});

  const dispatch = useDispatch<AppDispatch>();
  const dsDanhMuc = useSelector((state: RootState) => state.danhMuc.danhMucs);
  const statusDanhMuc = useSelector((state: RootState) => state.danhMuc.status);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const id_NhaHang = '66fab50fa28ec489c7137537';
    if (statusDanhMuc === 'idle') {
      dispatch(fetchDanhMucs(id_NhaHang));
      setIsLoading(true);
    } else if (statusDanhMuc === 'succeeded') {
      setFilterDanhMucList(dsDanhMuc || []);
      setIsLoading(false);

      // Mở rộng tất cả danh mục
      const expandedIds = dsDanhMuc.map(item => item._id);
      setExpandedDanhMuc(expandedIds);

      // Tải món ăn cho tất cả danh mục
      dsDanhMuc.forEach(item => {
        dispatch(fetchMonAns(item._id)).then(action => {
          if (fetchMonAns.fulfilled.match(action)) {
            setMonAnCounts(prev => ({
              ...prev,
              [item._id]: action.payload.length,
            }));
            // Cập nhật danh sách món ăn
            setMonAnList(prev => ({...prev, [item._id]: action.payload}));
          }
        });
      });
    } else if (statusDanhMuc === 'failed') {
      setIsLoading(false);
    }
  }, [dispatch, dsDanhMuc]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expandedDanhMuc]);

  const handleExpandDanhMuc = async (danhMucId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedDanhMuc.includes(danhMucId)) {
      setExpandedDanhMuc(prev => prev.filter(id => id !== danhMucId));
    } else {
      setExpandedDanhMuc(prev => [...prev, danhMucId]);
    }
  };

  const filterMonAnByName = (monAnList: MonAn[]) => {
    return monAnList.filter(monAn =>
      unorm
        .nfkd(monAn.tenMon)
        .toLowerCase()
        .includes(unorm.nfkd(searchQueryMonAn).toLowerCase()),
    );
  };

  // const filterDanhMucByName = (danhMucList: DanhMuc[]) => {
  //   return danhMucList.filter(danhMuc =>
  //     unorm
  //       .nfkd(danhMuc.tenDanhMuc)
  //       .toLowerCase()
  //       .includes(unorm.nfkd(searchQueryMonAn).toLowerCase()),
  //   );
  // };

  //console.log(monAnList['66fac699ec29d76397011e6d'][0].anhMonAn);

  const renderItem = ({item}: {item: DanhMuc}) => {
    const isExpanded = expandedDanhMuc.includes(item._id);
    const filteredMonAn = filterMonAnByName(monAnList[item._id] || []);
    //console.log(filteredMonAn);

    return (
      <View>
        <ItemDanhMuc
          nameCategory={item.tenDanhMuc}
          quantityCurrent={monAnCounts[item._id] || 0}
          totalFood={monAnCounts[item._id] || 0}
          isExpanded={isExpanded}
          onPress={() => handleExpandDanhMuc(item._id)}
        />
        {isExpanded && (
          <View>
            {filteredMonAn.length > 0 ? (
              filteredMonAn.map(monAn => (
                <ItemMonAn
                  id={monAn._id}
                  key={monAn._id}
                  nameFood={monAn.tenMon}
                  price={monAn.giaMonAn}
                  status={monAn.trangThai}
                  image={monAn.anhMonAn}
                  onPress={() => {
                    navigation.navigate('ProductDetailScreen', {
                      monAn: monAn,
                    });
                  }}
                />
              ))
            ) : (
              <TextComponent
                text="Chưa có món ăn nào trong nàyyy"
                color={colors.text}
                styles={{
                  alignSelf: 'center',
                  paddingTop: 10,
                }}
                minHeight={28}
              />
            )}
            <View
              style={{
                width: '80%',
                backgroundColor: 'white',
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        hoaStyles.container,
        {justifyContent: 'center', alignSelf: 'center'},
      ]}>
      <FlatList
        data={dsDanhMuc}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DanhMucComponent;
