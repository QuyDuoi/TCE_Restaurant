import {
  View,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import ItemKhuVuc from './Component/ItemKhuVuc';
import ItemBan from './Component/ItemBan';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import {useSelector} from 'react-redux';
import {KhuVuc} from '../../store/Slices/KhuVucSlice';
import {RootState} from '../../store/store';
import {Ban} from '../../store/Slices/BanSlice';

interface Props {
  searchQueryKhuVuc: string;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ThongTinKhuVuc = (props: Props) => {
  const {searchQueryKhuVuc} = props;

  console.log('render thong tin khu vuc');

  //const idNhaHang = '66fab50fa28ec489c7137537';

  const [bansKhuVuc, setBansKhuVuc] = useState<(Ban & {kv: KhuVuc})[]>([]);

  const khuVucs = useSelector((state: RootState) => state.khuVuc.khuVucs);
  const bans = useSelector((state: RootState) => state.ban.bans);

  const [expandKhuVuc, setExpandKhuVuc] = useState<string[]>([]);

  useEffect(() => {
    if (bans.length > 0) {
      setBansKhuVuc(bans as any);
    }
  }, [bans]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expandKhuVuc]);

  useEffect(() => {
    if (khuVucs.length > 0) {
      setTimeout(() => {
        setExpandKhuVuc(khuVucs.map(item => item._id as string));
      }, 1000);
    }
  }, [khuVucs]);

  const handleExpandKhuVuc = async (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandKhuVuc.includes(id)) {
      setExpandKhuVuc(expandKhuVuc.filter(item => item !== id));
    } else {
      setExpandKhuVuc([...expandKhuVuc, id]);
    }
  };

  const filterData = khuVucs.filter(item => {
    return item.tenKhuVuc
      .toLowerCase()
      .includes(searchQueryKhuVuc.toLowerCase());
  });

  const renderItemBan = ({item}: {item: Ban}) => {
    return (
      <ItemBan
        name={item.tenBan}
        capacity={item.sucChua}
        maQRCode={item.maQRCode}
        onPress={() => console.log(item._id)}
      />
    );
  };
console.log('bans:', bans);
console.log('filterData:', filterData);



  const renderItem = ({item}: {item: KhuVuc}) => {
    const isExpand = expandKhuVuc.includes(item._id as string);

    const banList = bansKhuVuc.filter(ban => ban.kv._id === item._id);
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
                text="Khu vực này chưa có bàn"
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
    <View
      style={[
        hoaStyles.containerTopping,
        {
          justifyContent: 'center',
        },
      ]}>
      <TitleComponent
        text="Chưa có khu vực được tạo"
        color={colors.desc}
        styles={{alignSelf: 'center'}}
      />
    </View>
  );
};

export default React.memo(ThongTinKhuVuc);
