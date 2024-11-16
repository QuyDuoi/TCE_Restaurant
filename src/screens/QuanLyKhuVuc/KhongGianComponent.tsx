import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ItemTrangThaiBan from './Component/ItemTrangThaiBan';
import SectionComponent from '../QuanLyThucDon/Hoa/components/SectionComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import ModalChucNang from './ComponentModal/ModalChucNang';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {KhuVuc} from '../../store/Slices/KhuVucSlice';
import {Ban} from '../../store/Slices/BanSlice';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import {searchBan} from '../../services/api';
import debounce from 'lodash';
import ItemBanSearch from './Component/ItemBanSearch';

interface Props {
  searchQueryBan: string;
}

const KhongGianComponent = (props: Props) => {
  //const idNhaHang = '66fab50fa28ec489c7137537';

  console.log('render khong gian component');

  const {searchQueryBan} = props;

  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [selectedBan, setSelectedBan] = useState<(Ban & {kv: KhuVuc}) | null>(
    null,
  );
  const [bansSearch, setBansSearch] = useState<Ban[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bans = useSelector((state: RootState) => state.ban.bans);
  const khuvucs = useSelector((state: RootState) => state.khuVuc.khuVucs);

  const debouncedSearchQueryBan = useRef(
    debounce.debounce(async (text: string) => {
      if (text.trim().length > 0) {
        setIsLoading(true);
        try {
          const data = await searchBan(text);
          setBansSearch(data as any);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setBansSearch([]);
      }
    }, 1500),
  );

  useEffect(() => {
    if (searchQueryBan.trim().length > 0) {
      setIsLoading(true);
    }
    debouncedSearchQueryBan.current(searchQueryBan);
    if (searchQueryBan.trim().length === 0) {
      setIsLoading(false);
    }

    return () => {
      debouncedSearchQueryBan.current.cancel();
    };
  }, [searchQueryBan]);

  const banTrong = bans.filter(ban => ban.trangThai === 'Trống');
  const banDaDat = bans.filter(ban => ban.trangThai === 'Đã đặt');
  const banDangSuDung = bans.filter(ban => ban.trangThai === 'Đang sử dụng');

  const getImageBan = (status: string) => {
    switch (status) {
      case 'Trống':
        return require('../../image/bantrong.png');
      case 'Đang sử dụng':
        return require('../../image/bansudung.png');
      case 'Đã đặt':
        return require('../../image/bandat.png');
    }
  };

  const handleSelectBan = useCallback(
    (ban: Ban) => {
      const idKhuVuc =
        typeof ban.id_khuVuc === 'string' ? ban.id_khuVuc : ban.id_khuVuc._id;
      const kv = khuvucs.find(kv => kv._id === idKhuVuc);
      //console.log(kv);
      setSelectedBan({...ban, kv: kv as KhuVuc});
      setIsVisibleDialog(true);
    },
    [selectedBan],
  );

  const renderItemSearch = ({item}: {item: Ban}) => {
    const banKhuVuc = khuvucs.find(kv => kv._id === (item.id_khuVuc as any));

    return (
      <ItemBanSearch
        tenBan={item.tenBan}
        tenKhuVuc={banKhuVuc?.tenKhuVuc ?? ''}
        trangThai={item.trangThai}
        image={getImageBan(item.trangThai)}
        onLongPress={() => {
          handleSelectBan(item);
          //handleSelectBanSearch(item);
        }}
      />
    );
  };

  const renderItem = ({item}: {item: Ban & {kv: KhuVuc}}) => {
    return (
      <ItemTrangThaiBan
        nameBan={item.tenBan}
        nameKhuVuc={item.kv.tenKhuVuc}
        image={getImageBan(item.trangThai)}
        onPress={() => {
          handleSelectBan(item);
        }}
      />
    );
  };

  const handleCloseModal = () => {
    setIsVisibleDialog(false);
    setSelectedBan(null);
  };

  return (
    <>
      {isLoading ? (
        <View
          style={[
            hoaStyles.containerTopping,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator size="large" />
        </View>
      ) : bans.length > 0 && searchQueryBan.trim().length === 0 ? (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={[
            hoaStyles.containerTopping,
            {
              backgroundColor: '#F7FAFC',
            },
          ]}>
          <View style={[]}>
            <SectionComponent
              styles={{
                height: banTrong.length > 0 ? undefined : '20%',
              }}>
              <TitleComponent text="Bàn trống" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
                {banTrong.length > 0 ? (
                  <FlatList
                    data={banTrong as any}
                    renderItem={renderItem}
                    keyExtractor={item => item._id as any}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <TextComponent
                    text="Không có bàn nào trống"
                    color={colors.desc}
                    styles={styles.textMessage}
                  />
                )}
              </View>
            </SectionComponent>
            <SectionComponent
              styles={{
                height: banDangSuDung.length > 0 ? undefined : '20%',
              }}>
              <TitleComponent text="Bàn đang sử dụng" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
                {banDangSuDung.length > 0 ? (
                  <FlatList
                    data={banDangSuDung as any}
                    renderItem={renderItem}
                    keyExtractor={item => item._id as any}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <TextComponent
                    text="Không có bàn nào được sử dụng"
                    color={colors.desc}
                    styles={styles.textMessage}
                  />
                )}
              </View>
            </SectionComponent>
            <SectionComponent
              styles={{
                height: banDaDat.length > 0 ? undefined : '20%',
              }}>
              <TitleComponent text="Bàn đã đặt" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
                {banDaDat.length > 0 ? (
                  <FlatList
                    data={banDaDat as any}
                    renderItem={renderItem}
                    keyExtractor={item => item._id as any}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : (
                  <TextComponent
                    text="Không có bàn nào được đặt"
                    color={colors.desc}
                    styles={styles.textMessage}
                  />
                )}
              </View>
            </SectionComponent>
          </View>
        </ScrollView>
      ) : searchQueryBan.trim().length > 0 && bansSearch.length > 0 ? (
        <View style={[hoaStyles.containerTopping]}>
          <FlatList
            data={bansSearch as any}
            renderItem={renderItemSearch}
            keyExtractor={item => item._id as any}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <SpaceComponent height={10} />}
          />
        </View>
      ) : (
        bansSearch.length === 0 &&
        searchQueryBan.trim().length > 0 && (
          <View
            style={[
              hoaStyles.containerTopping,
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <TitleComponent
              text="Chưa có bàn được tạo"
              color={colors.desc}
              styles={[styles.textMessage]}
            />
          </View>
        )
      )}
      <ModalChucNang
        isVisible={isVisibleDialog}
        onClose={handleCloseModal}
        onCloseParent={handleCloseModal}
        selectedBan={selectedBan}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textMessage: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  button: {
    height: 45,
  },
});

export default React.memo(KhongGianComponent);
