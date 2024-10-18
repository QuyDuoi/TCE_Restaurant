import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList, StyleSheet} from 'react-native';
import ItemTrangThaiBan from './Component/ItemTrangThaiBan';
import SectionComponent from '../QuanLyThucDon/Hoa/components/SectionComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import ModalComponent from './ComponentModal/ModalComponent';
import {testKhuVucData, KhuVucModelTest, BanModelTest} from './testData';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {fetchKhuVucs} from '../../store/KhuVucSlice';
import {fetchBans, Ban} from '../../store/BanSlice';

interface Props {
  searchQuery: string;
}

const KhongGianComponent = (props: Props) => {
  const idNhaHang = '66fab50fa28ec489c7137537';

  const dispatch = useDispatch();

  const {searchQuery} = props;

  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [selectedBan, setSelectedBan] = useState<Ban | null>(null);
  const [bans, setBans] = useState<(Ban & {maKhuVuc: string})[]>([]);

  const khuvucs = useSelector((state: RootState) => state.khuVuc.khuVucs);

  useEffect(() => {
    dispatch(fetchKhuVucs(idNhaHang) as any);
  }, []);

  useEffect(() => {
    if (khuvucs.length > 0) {
      const fetchAllBan = async () => {
        const allBans: (Ban & {maKhuVuc: string})[] = [];
        for (const kv of khuvucs) {
          const response = await dispatch(fetchBans(kv._id ?? '') as any);
          //console.log(response);

          if (response.payload) {
            const bansByKhuVuc = response.payload.map((ban: Ban) => {
              return {
                ...ban,
                maKhuVuc: kv.tenKhuVuc,
              };
            });
            allBans.push(...bansByKhuVuc);
          }
        }
        setBans(allBans);
      };
      fetchAllBan();
    }
    //console.log('bans', bans);
  }, [khuvucs]);

  // const filteredBan = khuVuc.flatMap(kv =>
  //   kv.ban
  //     .filter(ban => ban.name.toLowerCase().includes(searchQuery.toLowerCase()))
  //     .map(ban => ({...ban, maKhuVuc: kv.name})),
  // );

  const banTrong = bans.filter(ban => ban.trangThai === 'Trống');
  const banDaDat = bans.filter(ban => ban.trangThai === 'Đã đặt');
  const banDangSuDung = bans.filter(ban => ban.trangThai === 'Đang sử dụng');
  //console.log('banTrong--------------------------------------', banTrong);

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

  const renderItem = ({item}: {item: Ban & {maKhuVuc: string}}) => {
    return (
      <ItemTrangThaiBan
        nameBan={item.tenBan}
        nameKhuVuc={item.maKhuVuc}
        image={getImageBan(item.trangThai)}
        onPress={() => {
          //setSelectedBan(item);
          setIsVisibleDialog(true);
        }}
      />
    );
  };

  const handleCloseModal = () => {
    setIsVisibleDialog(false);
  };

  return (
    <>
      {banTrong.length > 0 ||
      banDaDat.length > 0 ||
      banDangSuDung.length > 0 ? (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={[
            {
              alignSelf: 'center',
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
                    data={banTrong}
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
                    data={banDangSuDung}
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
                    data={banDaDat}
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

          <ModalComponent
            isVisible={isVisibleDialog}
            onClose={handleCloseModal}
            selectedBan={selectedBan?.tenBan || ''}
          />
        </ScrollView>
      ) : (
        <View
          style={[
            {
              justifyContent: 'center',
            },
          ]}>
          <TitleComponent
            text="Chưa có bàn được tạo"
            color={colors.desc}
            styles={[styles.textMessage]}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textMessage: {
    alignSelf: 'center',
  },
  button: {
    height: 45,
  },
});

export default KhongGianComponent;
