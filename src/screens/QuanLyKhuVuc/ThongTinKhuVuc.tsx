import {
  View,
  Text,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import ItemKhuVuc from './Component/ItemKhuVuc';
import ItemBan from './Component/ItemBan';

import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import {KhuVucModelTest} from '../QuanLyThucDon/Hoa/modelTests/modelTest';
import {khuVucData} from '../QuanLyThucDon/Hoa/modelTests/sampleData';
import {useDispatch, useSelector} from 'react-redux';
import {fetchKhuVucs, KhuVuc} from '../../store/KhuVucSlice';
import {RootState} from '../../store/store';
import {Ban, fetchBans} from '../../store/BanSlice';

interface Props {
  searchQuery: string;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ThongTinKhuVuc = (props: Props) => {
  const {searchQuery} = props;

  const idNhaHang = '66fab50fa28ec489c7137537';

  const [bansByKhuVuc, setBansByKhuVuc] = useState<{[key: string]: Ban[]}>({});

  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);

  const bans = useSelector((state: RootState) => state.ban.bans);
  //console.log(' --------------------------------', bans);

  const [expandKhuVuc, setExpandKhuVuc] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKhuVucs(idNhaHang) as any);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expandKhuVuc]);

  //fetch ban, khu vuc
  useEffect(() => {
    if (khuVucs.length > 0) {
      const allKhuVucIds = khuVucs.map(item => item._id as string);
      //console.log('allKhuVucIds', allKhuVucIds);
      setExpandKhuVuc(allKhuVucIds);

      allKhuVucIds.forEach(id => {
        dispatch(fetchBans(id) as any).then((response: any) => {
          if (response.payload) {
            setBansByKhuVuc(prev => ({...prev, [id]: response.payload}));
          }
        });
      });
    }
  }, [khuVucs]);

  const handleExpandKhuVuc = async (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandKhuVuc.includes(id)) {
      setExpandKhuVuc(expandKhuVuc.filter(item => item !== id));
    } else {
      setExpandKhuVuc([...expandKhuVuc, id]);

      const response = await dispatch(fetchBans(id) as any);
      if (response.payload) {
        //console.log('response.payload', response.payload);

        setBansByKhuVuc(prev => ({...prev, [id]: response.payload}));
      }
    }
  };

  const filterData = khuVucs.filter(item => {
    return item.tenKhuVuc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderItemBan = ({item}: {item: Ban}) => {
    return (
      <ItemBan
        name={item.tenBan}
        capacity={item.sucChua}
        onPress={() => console.log(item._id)}
      />
    );
  };

  const renderItem = ({item}: {item: KhuVuc}) => {
    const isExpand = expandKhuVuc.includes(item._id as string);

    const banList = bansByKhuVuc[item._id as string] || [];
    //console.log('banList', banList);

    return (
      <View>
        <ItemKhuVuc
          name={item.tenKhuVuc}
          isExpanded={isExpand}
          onPress={() => {
            handleExpandKhuVuc(item._id as string);
          }}
          onLongPress={() => {
            console.log(item._id);
          }}
        />
        {isExpand &&
          (banList.length > 0 ? (
            <View style={{marginLeft: 10}}>
              <FlatList
                data={banList}
                renderItem={renderItemBan}
                keyExtractor={item => item._id as string}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}>
              <TextComponent
                text="Khu vuc nay chua co ban"
                color={colors.desc}
              />
            </View>
          ))}
      </View>
    );
  };
  return khuVucs.length > 0 ? (
    <View style={[hoaStyles.containerTopping, {}]}>
      {
        <FlatList
          data={filterData}
          renderItem={renderItem}
          keyExtractor={item => item._id as string}
          showsVerticalScrollIndicator={false}
        />
      }
    </View>
  ) : (
    <View style={[hoaStyles.containerTopping]}>
      <TitleComponent text="Chưa có khu vực được tạo" color={colors.desc} />
    </View>
  );
};

export default ThongTinKhuVuc;
