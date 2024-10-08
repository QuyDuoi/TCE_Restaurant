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

interface KhuVucModelTest {
  id: string;
  name: string;
  ban: BanModelTest[];
}

interface BanModelTest {
  id: string;
  name: string;
  capacity: number;
  status: string;
  ghiChu: string;
}

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

  const [expandKhuVuc, setExpandKhuVuc] = useState<string[]>([]);

  const [khuVucList, setKhuVucList] = useState<KhuVucModelTest[]>([
    {
      id: '1',
      name: 'Tang 1',
      ban: [
        {
          id: '1',
          name: 'ban 1',
          capacity: 100,
          status: 'trong',
          ghiChu: 'ghi chu',
        },
        {
          id: '2',
          name: 'ban 2',
          capacity: 100,
          status: 'trong',
          ghiChu: 'ghi chu',
        },
      ],
    },
    {
      id: '2',
      name: 'tang 2',
      ban: [
        {
          id: '3',
          name: '1',
          capacity: 100,
          status: 'trong',
          ghiChu: 'ghi chu',
        },
        {
          id: '4',
          name: 'ban 2',
          capacity: 100,
          status: 'trong',
          ghiChu: 'ghi chu',
        },
      ],
    },
    {
      id: '3',
      name: 'tang 3',
      ban: [],
    },
    {
      id: '4',
      name: 'tang 4',
      ban: [
        {
          id: '5',
          name: 'ban 1',
          capacity: 100,
          status: 'trong',
          ghiChu: 'ghi chu',
        },
        {
          id: '6',
          name: 'ban 2',
          capacity: 100,
          status: 'trong',
          ghiChu: 'ghi chu',
        },
      ],
    },
  ]);

  useEffect(() => {
    const expandded = khuVucList
      .filter(kv => kv.ban.length > 0)
      .map(kv => kv.id);
    setExpandKhuVuc(expandded);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expandKhuVuc]);

  const handleExpandKhuVuc = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandKhuVuc(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return [...prev, id];
    });
  };

  const filterData = khuVucList.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderItem = ({item}: {item: KhuVucModelTest | BanModelTest}) => {
    if ('ban' in item) {
      const isExpand = expandKhuVuc.includes(item.id);

      return (
        <View>
          <ItemKhuVuc
            name={item.name}
            isExpanded={isExpand}
            onPress={() => {
              handleExpandKhuVuc(item.id);
            }}
            onLongPress={() => {
              console.log(item.id);
            }}
          />
          {isExpand && (
            <View>
              <SpaceComponent height={10} />
              {item.ban.length > 0 ? (
                item.ban.map(ban => (
                  <ItemBan
                    name={ban.name}
                    capacity={ban.capacity}
                    onPress={() => {
                      console.log(ban.id);
                    }}
                    key={ban.id}
                  />
                ))
              ) : (
                <View style={{}}>
                  <TextComponent
                    text="Chưa có bàn được tạo"
                    color={colors.text2}
                    styles={{
                      alignSelf: 'center',
                      paddingTop: 5,
                    }}
                  />
                </View>
              )}
              <SpaceComponent height={6} />
              <View
                style={[
                  {
                    width: '100%',
                    borderWidth: 1,
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 5,
                    borderColor: colors.desc2,
                  },
                ]}
              />
            </View>
          )}
        </View>
      );
    } else {
      return null;
    }
  };
  return khuVucList.length > 0 ? (
    <View style={[hoaStyles.containerTopping, {}]}>
      {
        <FlatList
          data={filterData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
