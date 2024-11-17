import {
  View,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import ItemDanhMuc from '../lists/ItemDanhMuc';
import ItemMonAn from '../lists/ItemMonAn';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';
import {MonAn} from '../../../../store/Slices/MonAnSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {DanhMuc} from '../../../../store/Slices/DanhMucSlice';
import {searchMonAn} from '../../../../services/api';
import debounce from 'lodash';

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
  const [expandedDanhMuc, setExpandedDanhMuc] = useState<string[]>([]);
  const [monAnList, setMonAnList] = useState<{[key: string]: MonAn[]}>({});
  const [monAnCounts, setMonAnCounts] = useState<{[key: string]: number}>({});
  const [filteredMonAn, setFilteredMonAn] = useState<MonAn[]>([]);

  const dsDanhMuc = useSelector((state: RootState) => state.danhMuc.danhMucs);
  const dsMonAn = useSelector((state: RootState) => state.monAn.monAns);
  const navigation = useNavigation<any>();

  useEffect(() => {
    console.log('Danh sách danh mục: ' + dsDanhMuc);

      // Mở rộng tất cả danh mục
      const expandedIds = dsDanhMuc.map(item => item._id);
      setExpandedDanhMuc(expandedIds);

      // Tạo đối tượng đếm số lượng món ăn và nhóm món ăn theo danh mục
      const monAnCountsTemp: {[key: string]: number} = {};
      const monAnListTemp: {[key: string]: MonAn[]} = {};

      // Lặp qua dsMonAn để tính số lượng món ăn cho từng danh mục và nhóm món ăn theo danh mục
      dsMonAn.forEach(monAn => {
        const danhMucId = monAn.id_danhMuc; // giả sử mỗi món ăn có thuộc tính id_danhMuc
        if (!monAnCountsTemp[danhMucId]) {
          monAnCountsTemp[danhMucId] = 0;
          monAnListTemp[danhMucId] = [];
        }
        monAnCountsTemp[danhMucId] += 1;
        monAnListTemp[danhMucId].push(monAn);
      });

      // Cập nhật state
      setMonAnCounts(monAnCountsTemp);
      setMonAnList(monAnListTemp);
  }, [dsDanhMuc]);

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

  //xu ly tim kiem
  const debounceSearch = useRef(
    debounce.debounce(
      async (text: string, id_NhaHang: string) => {
        if (text.trim().length > 0) {

          try {
            const data = await searchMonAn(text, id_NhaHang);
            setFilteredMonAn(data);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setFilteredMonAn([]);
        }
      },
      1000, // Thời gian debounce (1 giây)
    ),
  );

  useEffect(() => {
    if (searchQueryMonAn.trim().length > 0) {
      setIsLoading(true);
      debounceSearch.current(searchQueryMonAn, '66fab50fa28ec489c7137537');
    } else if (searchQueryMonAn.trim().length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    // Hủy bỏ debounce khi component unmount hoặc searchQueryMonAn thay đổi
    return () => debounceSearch.current.cancel();
  }, [searchQueryMonAn]);

  const renderSearchItem = ({item}: {item: MonAn}) => {
    return (
      <ItemMonAn
        id={item._id}
        nameFood={item.tenMon}
        price={item.giaMonAn}
        status={item.trangThai}
        image={item.anhMonAn}
        onPress={() => {
          navigation.navigate('ProductDetailScreen', {
            monAn: item,
          });
        }}
      />
    );
  };

  const renderItem = ({item}: {item: DanhMuc}) => {
    const isExpanded = expandedDanhMuc.includes(item._id);
    const monAns = monAnList[item._id] || [];

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
            {monAns.length > 0 ? (
              monAns.map(monAn => (
                <ItemMonAn
                  id={monAn._id}
                  key={monAn._id}
                  nameFood={monAn.tenMon}
                  price={monAn.giaMonAn}
                  status={monAn.trangThai}
                  image={monAn.anhMonAn}
                  onPress={() => {
                    navigation.navigate('ChiTietMonAn', {
                      monAn: monAn,
                    });
                  }}
                />
              ))
            ) : (
              <TextComponent
                text="Chưa có món ăn nào trong danh mục này"
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
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : filteredMonAn.length > 0 && searchQueryMonAn.trim().length > 0 ? (
        <FlatList
          data={filteredMonAn as any}
          renderItem={renderSearchItem}
          keyExtractor={item => item._id as string}
          showsVerticalScrollIndicator={false}
        />
      ) : searchQueryMonAn.trim().length > 0 && filteredMonAn.length === 0 ? (
        <TextComponent text="Không tìm thấy món ăn nào" />
      ) : (
        searchQueryMonAn.trim().length === 0 && (
          <FlatList
            data={dsDanhMuc}
            renderItem={renderItem}
            keyExtractor={item => item._id as string}
            showsVerticalScrollIndicator={false}
          />
        )
      )}
    </View>
  );
};

export default DanhMucComponent;