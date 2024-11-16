import {
  View,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import ItemDanhMuc from '../lists/ItemDanhMuc';
import ItemMonAn from '../lists/ItemMonAn';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';
import {fetchMonAns, MonAn} from '../../../../store/MonAnSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {DanhMuc, fetchDanhMucs} from '../../../../store/DanhMucSlice';
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

  const dispatch = useDispatch<AppDispatch>();
  const dsDanhMuc = useSelector((state: RootState) => state.danhMuc.danhMucs);
  const statusDanhMuc = useSelector((state: RootState) => state.danhMuc.status);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (statusDanhMuc === 'idle') {
      setIsLoading(true);
    } else if (statusDanhMuc === 'succeeded') {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

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
            setMonAnList(prev => ({
              ...prev,
              [item._id]: mergeMonAnLists(prev[item._id] || [], action.payload),
            }));
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

  //xu ly tim kiem
  const debounceSearch = useRef(
    debounce.debounce(
      async (text: string, id_NhaHang: string) => {
        if (text.trim().length > 0) {
          setIsLoading(true);
  
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
    }
  
    // Gọi debounceSearch với cả text và id_NhaHang
    debounceSearch.current(searchQueryMonAn, '66fab50fa28ec489c7137537');
  
    if (searchQueryMonAn.trim().length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  
    // Hủy bỏ debounce khi component unmount hoặc searchQueryMonAn thay đổi
    return () => debounceSearch.current.cancel();
  }, [searchQueryMonAn, '66fab50fa28ec489c7137537']); // Thêm id_NhaHang vào danh sách phụ thuộc  

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

// loai bo trung lap
function mergeMonAnLists(existingList: MonAn[], newList: MonAn[]) {
  const existingIds = new Set(existingList.map(monAn => monAn._id));
  const mergedList = [...existingList];
  newList.forEach(monAn => {
    if (!existingIds.has(monAn._id)) {
      mergedList.push(monAn);
      existingIds.add(monAn._id);
    }
  });
  return mergedList;
}
