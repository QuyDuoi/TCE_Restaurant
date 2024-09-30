import {
  View,
  Text,
  ScrollView,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
  useWindowDimensions,
} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import ItemDanhMuc from '../lists/ItemDanhMuc';
import ItemMonAn from '../lists/ItemMonAn';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';

interface DanhMucModelTest {
  id: string;
  nameCategory: string;
  quantityCurrent: number;
  totalFood: number;
  monAn: MonAnModelTest[];
}

interface MonAnModelTest {
  id: string;
  nameFood: string;
  price: number;
  status: boolean;
  image?: string;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DanhMucComponent = () => {
  const [expandedDanhMuc, setExpandedDanhMuc] = useState<string[]>([]);

  const [danhMucList, setDanhMucList] = useState<DanhMucModelTest[]>([
    {
      id: '1',
      nameCategory: 'Bữa chính',
      quantityCurrent: 3,
      totalFood: 3,
      monAn: [
        {id: '1', nameFood: 'Cơm gà', price: 50000, status: true},
        {id: '2', nameFood: 'Phở bò', price: 55000, status: true},
        {id: '3', nameFood: 'Bún chả', price: 45000, status: true},
      ],
    },
    {
      id: '2',
      nameCategory: 'Tráng miệng',
      quantityCurrent: 2,
      totalFood: 2,
      monAn: [
        {id: '4', nameFood: 'Chè thái', price: 25000, status: true},
        {id: '5', nameFood: 'Trái cây', price: 20000, status: true},
      ],
    },
    {
      id: '3',
      nameCategory: 'Tráng miệng',
      quantityCurrent: 2,
      totalFood: 2,
      monAn: [
        {id: '6', nameFood: 'Chè thái', price: 25000, status: true},
        {id: '7', nameFood: 'Trái cây', price: 20000, status: true},
      ],
    },
    {
      id: '4',
      nameCategory: 'Tráng miệng',
      quantityCurrent: 0,
      totalFood: 0,
      monAn: [],
    },
    {
      id: '5',
      nameCategory: 'Tráng miệng',
      quantityCurrent: 2,
      totalFood: 2,
      monAn: [
        {id: '8', nameFood: 'Chè thái', price: 25000, status: true},
        {id: '9', nameFood: 'Trái cây', price: 20000, status: true},
      ],
    },
  ]);

  useEffect(() => {
    const expanded = danhMucList
      .filter(danhMuc => danhMuc.monAn.length > 0)
      .map(danhMuc => danhMuc.id);
    setExpandedDanhMuc(expanded);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expandedDanhMuc]);

  const handleExpandDanhMuc = (danhMucId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDanhMuc(prev => {
      if (prev.includes(danhMucId)) {
        return prev.filter(id => id !== danhMucId);
      } else {
        return [...prev, danhMucId];
      }
    });
  };

  const handleStatusChange = (
    danhMucId: string,
    monAnId: string,
    newStatus: boolean,
  ) => {
    const updateDanhMucList = danhMucList.map(danhMuc =>
      danhMuc.id === danhMucId
        ? {
            ...danhMuc,
            monAn: danhMuc.monAn.map(monAn =>
              monAn.id === monAnId ? {...monAn, status: newStatus} : monAn,
            ),
            quantityCurrent: danhMuc.quantityCurrent + (newStatus ? 1 : -1),
          }
        : danhMuc,
    ) as DanhMucModelTest[];
    setDanhMucList(updateDanhMucList);
  };

  /* FlatList lồng

  const renderMonAn = ({item}: {item: MonAnModelTest}) => {
    return (
      <ItemMonAn
        nameFood={item.nameFood}
        price={item.price}
        status={item.status}
        image={item.image ?? ''}
      />
    );
  };

  const renderDanhMuc = ({item}: {item: DanhMucModelTest}) => {
    return (
      <View>
        <ItemDanhMuc
          nameCategory={item.nameCategory}
          quantityCurrent={item.quantityCurrent}
          totalFood={item.totalFood}
          isExpanded={expanded === item.id}
          onPress={() => handleExpandDanhMuc(item.id)}
        />
        {expanded === item.id && (
          <FlatList
            data={item.monAn}
            renderItem={renderMonAn}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        )}
      </View>
    );
  };
  */

  const renderItem = ({item}: {item: DanhMucModelTest | MonAnModelTest}) => {
    if ('monAn' in item) {
      const isExpanded = expandedDanhMuc.includes(item.id);
      return (
        <View>
          <ItemDanhMuc
            nameCategory={item.nameCategory}
            quantityCurrent={item.monAn.length > 0 ? item.quantityCurrent : 0}
            totalFood={item.monAn.length > 0 ? item.totalFood : 0}
            isExpanded={isExpanded}
            onPress={() => handleExpandDanhMuc(item.id)}
          />
          {isExpanded && (
            <View>
              {item.monAn.length > 0 ? (
                item.monAn.map(monAn => (
                  <ItemMonAn
                    key={monAn.id}
                    nameFood={monAn.nameFood}
                    price={monAn.price}
                    status={monAn.status}
                    image={monAn.image ?? ''}
                    onStatusChange={newStatus =>
                      handleStatusChange(item.id, monAn.id, newStatus)
                    }
                    onPress={() => console.log(monAn.id)}
                  />
                ))
              ) : (
                <TextComponent
                  text="Chưa có món ăn nào trong nàyyy"
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
    } else {
      return null;
    }
  };

  return (
    <View
      style={[
        hoaStyles.container,
        {
          justifyContent: 'center',
          alignSelf: 'center',
        },
      ]}>
      {
        <FlatList
          data={danhMucList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      }
    </View>
  );
};

export default DanhMucComponent;
