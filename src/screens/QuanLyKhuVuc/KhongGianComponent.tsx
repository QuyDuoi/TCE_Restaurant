import React, { useState } from 'react';
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import ItemTrangThaiBan from './Component/ItemTrangThaiBan';
import SectionComponent from '../QuanLyThucDon/Hoa/components/SectionComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import { colors } from '../QuanLyThucDon/Hoa/contants/hoaColors';
import ModalComponent from './ComponentModal/ModalComponent';
import { testKhuVucData, KhuVucModelTest, BanModelTest } from './testData';

interface Props {
  searchQuery: string;
}

const KhongGianComponent = (props: Props) => {
  const { searchQuery } = props;
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);
  const [selectedBan, setSelectedBan] = useState<BanModelTest | null>(null);

  // Sử dụng dữ liệu test cố định từ testData.ts
  const [khuVuc, setKhuVuc] = useState<KhuVucModelTest[]>(testKhuVucData);

  const filteredBan = khuVuc.flatMap(kv =>
    kv.ban
      .filter(ban => ban.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(ban => ({ ...ban, maKhuVuc: kv.name })),
  );

  const banTrong = filteredBan.filter(ban => ban.status === 'Trong');
  const banDaDat = filteredBan.filter(ban => ban.status === 'Da dat');
  const banDangSuDung = filteredBan.filter(ban => ban.status === 'Dang su dung');

  const getImageBan = (status: string) => {
    switch (status) {
      case 'Trong':
        return require('../../image/bantrong.png');
      case 'Dang su dung':
        return require('../../image/bansudung.png');
      case 'Da dat':
        return require('../../image/bandat.png');
    }
  };

  const renderItem = ({ item }: { item: BanModelTest & { maKhuVuc: string } }) => {
    return (
      <ItemTrangThaiBan
        nameBan={item.name}
        nameKhuVuc={item.maKhuVuc}
        image={getImageBan(item.status)}
        onPress={() => {
          setSelectedBan(item);
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
      {banTrong.length > 0 || banDaDat.length > 0 || banDangSuDung.length > 0 ? (
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={[
            {
              alignSelf: 'center',
              backgroundColor: '#F7FAFC',
            },
          ]}>
          <View>
            <SectionComponent
              styles={{
                height: banTrong.length > 0 ? undefined : '20%',
              }}>
              <TitleComponent text="Bàn trống" size={18} />
              <SpaceComponent height={10} />
              <View style={{ justifyContent: 'center', flex: 1 }}>
                {banTrong.length > 0 ? (
                  <FlatList
                    data={banTrong}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
              <View style={{ justifyContent: 'center', flex: 1 }}>
                {banDangSuDung.length > 0 ? (
                  <FlatList
                    data={banDangSuDung}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
              <View style={{ justifyContent: 'center', flex: 1 }}>
                {banDaDat.length > 0 ? (
                  <FlatList
                    data={banDaDat}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
            selectedBan={selectedBan?.name || ''}
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
