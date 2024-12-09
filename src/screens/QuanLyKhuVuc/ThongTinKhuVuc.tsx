import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  ToastAndroid,
} from 'react-native';
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
import ModalThemSuaKhuVuc from './ComponentModal/ModalThemSuaKhuVuc';

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
  const [isCapNhatKhuVuc, setIsCapNhatKhuVuc] = useState(false);
  const [selectedKhuVuc, setSelectedKhuVuc] = useState<KhuVuc | null>(null); // State để giữ khu vực được chọn
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
    return <ItemBan ban={item} onPress={() => console.log(item._id)} />;
  };

  const renderItem = ({item}: {item: KhuVuc}) => {
    const isExpand = expandKhuVuc.includes(item._id as string);

    const banList = bansKhuVuc.filter(
      ban => ban.id_khuVuc === (item._id as any),
    );

    return (
      <View style={{flex: 1}}>
        <ItemKhuVuc
          name={item.tenKhuVuc}
          isExpanded={isExpand}
          onPress={() => {
            handleExpandKhuVuc(item._id as string);
          }}
          onLongPress={() => {
            // Mở modal cập nhật khu vực khi nhấn giữ lâu
            setSelectedKhuVuc(item);
            setIsCapNhatKhuVuc(true);
          }}
          styles={{
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
            backgroundColor: '#F3FEEF',
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

  return (
    <>
      {khuVucs.length > 0 ? (
        <View style={[hoaStyles.containerTopping, {}]}>
          <FlatList
            data={filterData}
            renderItem={renderItem}
            keyExtractor={item => item._id as string}
            showsVerticalScrollIndicator={false}
          />
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
      )}
      {/* Modal cập nhật khu vực */}
      {selectedKhuVuc && (
        <ModalThemSuaKhuVuc
          visible={isCapNhatKhuVuc}
          onClose={() => setIsCapNhatKhuVuc(false)}
          idKhuVucUd={selectedKhuVuc._id}
          tenKhuVucUd={selectedKhuVuc.tenKhuVuc}
          onActionComplete={(success, message) => {
            if (success) {
              ToastAndroid.show(message, ToastAndroid.SHORT); // Hiển thị thông báo thành công
            } else {
              ToastAndroid.show(message, ToastAndroid.SHORT);
            }
            setIsCapNhatKhuVuc(false);
          }}
        />
      )}
    </>
  );
};

export default React.memo(ThongTinKhuVuc);
