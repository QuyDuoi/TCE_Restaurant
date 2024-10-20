import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hoaStyles} from '../styles/hoaStyles';
import TextComponent from './TextComponent';
import {colors} from '../contants/hoaColors';
import RowComponent from './RowComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpaceComponent from './SpaceComponent';
import ItemNhomTopping from '../lists/ItemNhomTopping';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import {
  fetchNhomTopping,
  NhomTopping,
} from '../../../../store/NhomToppingSlice';
import {fetchTopping, Topping} from '../../../../store/ToppingSlice';
import unorm from 'unorm';

interface Props {
  searchQueryNhomTopping: string;
}

const NhomToppingComponent = (props: Props) => {
  const {searchQueryNhomTopping} = props;
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const dsNhomTopping = useSelector(
    (state: RootState) => state.nhomToppings.nhomToppings,
  );
  const statusNhomTopping = useSelector(
    (state: RootState) => state.nhomToppings.status,
  );
  const [filterNhomToppingList, setFilterNhomToppingList] = useState<
    NhomTopping[]
  >([]);
  // const dsToppings = useSelector((state: RootState) => state.toppings.toppings);
  // console.log(dsToppings);

  const [filterToppingList, setFilterToppingList] = useState<Topping[]>([]);
  const [listScreen, setListScreen] = useState<
    {id: string; name: string; toppings: Topping[]}[]
  >([]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (statusNhomTopping === 'idle') {
        dispatch(fetchNhomTopping());
        setIsLoading(true);
      } else if (statusNhomTopping === 'succeeded') {
        setFilterNhomToppingList(dsNhomTopping || []);
        setIsLoading(false);
      } else if (statusNhomTopping === 'failed') {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [dispatch, statusNhomTopping, dsNhomTopping]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (statusNhomTopping === 'succeeded' && dsNhomTopping.length > 0) {
        setIsLoading(true);
        try {
          const allToppings: Topping[] = [];
          for (const nhomTopping of dsNhomTopping) {
            const action = await dispatch(fetchTopping(nhomTopping._id));
            if (fetchTopping.fulfilled.match(action)) {
              allToppings.push(...(action.payload as any));
            }
          }
          setFilterToppingList(allToppings);
          setIsLoading(false);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách topping:', error);
          setIsLoading(false);
        }
      }
    };

    fetchAllData();
  }, [dsNhomTopping, statusNhomTopping, dispatch]);

  useEffect(() => {
    if (filterNhomToppingList.length && filterToppingList.length) {
      const listNhomToppingScreen = filterNhomToppingList.map(
        (nhomTopping: NhomTopping) => {
          const toppingsForNhom = filterToppingList.filter(
            (topping: Topping) => topping.id_nhomTopping === nhomTopping._id,
          );

          return {
            id: nhomTopping._id,
            name: nhomTopping.tenNhomTopping,
            toppings: toppingsForNhom,
          };
        },
      );

      setListScreen(listNhomToppingScreen);
    }
  }, [filterNhomToppingList, filterToppingList]);

  const filterData = listScreen.filter(item => {
    const normalizedSearchQuery = unorm
      .nfd(searchQueryNhomTopping)
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const normalizedName = unorm
      .nfd(item.name)
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    return normalizedName.includes(normalizedSearchQuery);
  });

  return (
    <View
      style={[
        hoaStyles.containerTopping,
        {
          backgroundColor: '#EAEAEA',
          alignSelf: 'center',
          flex: 1, // Đảm bảo chiếm toàn bộ chiều cao của container
        },
      ]}>
      <FlatList
        data={filterData}
        renderItem={({item}: any) => <ItemNhomTopping nhomTopping={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default NhomToppingComponent;
