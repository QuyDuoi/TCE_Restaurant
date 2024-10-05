import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {hoaStyles} from '../QuanLyThucDon/Hoa/styles/hoaStyles';
import ItemTrangThaiBan from './ItemTrangThaiBan';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import SectionComponent from '../QuanLyThucDon/Hoa/components/SectionComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import TitleComponent from '../QuanLyThucDon/Hoa/components/TitleComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';

interface KhuVucModelTest {
  id: string;
  name: string;
  ban: BanModelTest[];
}

interface BanModelTest {
  id: string;
  name: string;
  capacity: number;
  status: string | 'Trong' | 'Dang su dung' | 'Da dat';
  ghiChu: string | null;
}

const image = {
  Trong: require('../../QuanLyThucDon/Hoa/assets//bantrong.png'),
  DangSuDung: require('../../QuanLyThucDon/Hoa/assets//bansudung.png'),
  DaDat: require('../../QuanLyThucDon/Hoa/assets//bandat.png'),
};

interface Props {
  searchQuery: string;
}

const KhongGianComponent = (props: Props) => {
  const {searchQuery} = props;
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);

  const [selectedBan, setSelectedBan] = useState<BanModelTest | null>(null);

  const [khuVuc, setKhuVuc] = useState<KhuVucModelTest[]>([
    {
      id: '1',
      name: 'Tang 1',
      ban: [
        {
          id: '1',
          name: 'Ban 1',
          capacity: 4,
          status: 'Dan su dung',
          ghiChu: 'ghi chu ban 1',
        },
        {
          id: '2',
          name: 'Ban 2',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 2',
        },
        {
          id: '3',
          name: 'Ban 3',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 3',
        },
        {
          id: '4',
          name: 'Ban 4',
          capacity: 4,
          status: 'Dang su dung',
          ghiChu: 'ghi chu ban 4',
        },
        {
          id: '21',
          name: 'Ban 21',
          capacity: 4,
          status: 'Trong',
          ghiChu: 'ghi chu ban 4',
        },
      ],
    },
    {
      id: '2',
      name: 'Tang 2',
      ban: [
        {
          id: '5',
          name: 'Ban 1',
          capacity: 4,
          status: 'Dang su dung',
          ghiChu: 'ghi chu ban 1',
        },
        {
          id: '6',
          name: 'Ban 2',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 2',
        },
        {
          id: '7',
          name: 'Ban 3',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 3',
        },
      ],
    },
    {
      id: '3',
      name: 'Tang 3',
      ban: [],
    },
    {
      id: '4',
      name: 'Tang 4',
      ban: [
        {
          id: '8',
          name: 'Ban 1',
          capacity: 4,
          status: 'Dang su dung',
          ghiChu: 'ghi chu ban 1',
        },
        {
          id: '9',
          name: 'Ban 2',
          capacity: 4,
          status: 'Da dat',
          ghiChu: 'ghi chu ban 2',
        },
        {
          id: '10',
          name: 'Ban 3',
          capacity: 4,
          status: 'Trong',
          ghiChu: 'ghi chu ban 3',
        },
      ],
    },
  ]);

  // const [khuVuc, setKhuVuc] = useState<KhuVucModelTest[]>([
  //   {
  //     id: '1',
  //     name: 'Tang 1',
  //     ban: [
  //       {
  //         id: '1',
  //         name: 'Ban 1',
  //         capacity: 4,
  //         status: 'Dang su dung',
  //         ghiChu: 'ghi chu ban 1',
  //       },
  //       {
  //         id: '2',
  //         name: 'Ban 2',
  //         capacity: 4,
  //         status: 'Da dat',
  //         ghiChu: 'ghi chu ban 2',
  //       },
  //       {
  //         id: '3',
  //         name: 'Ban 3',
  //         capacity: 4,
  //         status: 'Trong',
  //         ghiChu: 'ghi chu ban 3',
  //       },
  //       {
  //         id: '4',
  //         name: 'Ban 4',
  //         capacity: 4,
  //         status: 'Dang su dung',
  //         ghiChu: 'ghi chu ban 4',
  //       },
  //     ],
  //   },
  // ]);

  const filteredBan = khuVuc.flatMap(kv =>
    kv.ban
      .filter(ban => ban.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(ban => ({...ban, maKhuVuc: kv.name})),
  );

  const banTrong = filteredBan.filter(ban => ban.status === 'Trong');

  //console.log('banTrong', banTrong);

  const banDaDat = filteredBan.filter(ban => ban.status === 'Da dat');

  const banDangSuDung = filteredBan.filter(
    ban => ban.status === 'Dang su dung',
  );

  const getImageBan = (status: string) => {
    switch (status) {
      case 'Trong':
        return image.Trong;
      case 'Dang su dung':
        return image.DangSuDung;
      case 'Da dat':
        return image.DaDat;
    }
  };

  const renderItem = ({item}: {item: BanModelTest & {maKhuVuc: string}}) => {
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

  const handleOptionPress = (action: string) => {
    if (
      selectedBan &&
      (selectedBan.status === 'Da dat' || selectedBan.status === 'Dang su dung')
    ) {
      setIsVisibleDialog(false);
      ToastAndroid.show(
        `Ban ${selectedBan.status === 'Da dat' ? 'Da dat' : 'Dang su dung'}`,
        ToastAndroid.SHORT,
      );
    }
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
            hoaStyles.containerTopping,
            {
              alignSelf: 'center',
              backgroundColor: '##F7FAFC',
            },
          ]}>
          <View>
            <SectionComponent
              styles={{
                height: banTrong.length > 0 ? undefined : '20%',
              }}>
              <TitleComponent text="Ban Trong" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
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
                    text="Khong co ban nao trong"
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
              <TitleComponent text="Dang su dung" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
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
                    text="Khong co ban nao dang duoc su dung"
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
              <TitleComponent text="Ban da dat" size={18} />
              <SpaceComponent height={10} />
              <View style={{justifyContent: 'center', flex: 1}}>
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
                    text="Khong co ban nao duoc dat"
                    color={colors.desc}
                    styles={styles.textMessage}
                  />
                )}
              </View>
            </SectionComponent>
          </View>

          <Modal visible={isVisibleDialog} transparent animationType="fade">
            <TouchableWithoutFeedback
              onPress={() => {
                setIsVisibleDialog(false);
              }}>
              <View style={[hoaStyles.modalContainer]}>
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      {
                        width: '85%',
                        backgroundColor: colors.white,
                        borderRadius: 10,
                        padding: 5,
                      },
                    ]}>
                    <TitleComponent
                      text="Lua chon chuc nang"
                      size={18}
                      styles={{
                        alignSelf: 'center',
                        padding: 5,
                        marginTop: 5,
                      }}
                    />
                    <SpaceComponent height={13} />
                    <SectionComponent>
                      <ButtonComponent
                        title="Dat ban"
                        onPress={() => {
                          handleOptionPress('Dat ban');
                        }}
                        bgrColor={colors.orange}
                        titleColor={colors.white}
                        styles={[styles.button]}
                        boderRadius={100}
                      />
                    </SectionComponent>
                    <SectionComponent>
                      <ButtonComponent
                        title="Tao hoa don"
                        onPress={() => {}}
                        bgrColor={colors.orange}
                        titleColor={colors.white}
                        styles={[styles.button]}
                        boderRadius={100}
                      />
                    </SectionComponent>
                    <SectionComponent>
                      <ButtonComponent
                        title="xem thong tin hoa don"
                        onPress={() => {}}
                        bgrColor={colors.orange}
                        titleColor={colors.white}
                        styles={[styles.button]}
                        boderRadius={100}
                      />
                    </SectionComponent>
                    <SectionComponent>
                      <ButtonComponent
                        title="Xem thong tin ban dat"
                        onPress={() => {}}
                        bgrColor={colors.orange}
                        titleColor={colors.white}
                        styles={[styles.button]}
                        boderRadius={100}
                      />
                    </SectionComponent>
                    <SpaceComponent height={24} />
                    <SectionComponent>
                      <ButtonComponent
                        title="Quay lai"
                        onPress={() => {
                          setIsVisibleDialog(false);
                        }}
                        bgrColor={colors.white}
                        titleColor={colors.black}
                        boederWidth={2}
                        borderColor={colors.black}
                        styles={{height: 45, marginBottom: 3}}
                        boderRadius={100}
                      />
                    </SectionComponent>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </ScrollView>
      ) : (
        <View
          style={[
            hoaStyles.containerTopping,
            {
              justifyContent: 'center',
            },
          ]}>
          <TitleComponent
            text="Chua co ban nao duoc tao"
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
