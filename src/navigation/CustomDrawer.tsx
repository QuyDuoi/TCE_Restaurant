import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import TextComponent from '../screens/QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import SpaceComponent from '../screens/QuanLyThucDon/Hoa/components/SpaceComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawer = (props: any) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.headerContainer]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/fa/28/b9/fa28b924175195e3175a886f5e2beb77.jpg',
            }}
            style={styles.image}
          />
          <View>
            <TextComponent
              text="Nguyễn Văn a truong b"
              styles={styles.text2}
              numberOfLines={1}
            />
            <SpaceComponent height={2} />
            <TextComponent
              text="vi tri nhan vien"
              styles={styles.text1}
              numberOfLines={1}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60%',
          }}>
          <TextComponent
            text="ten nha hanggggggggggggggggggggggg"
            styles={styles.text3}
            numberOfLines={1}
          />
          <TextComponent
            text="dia chi nha hang"
            styles={styles.text3}
            numberOfLines={1}
          />
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}>
        <View style={[styles.listItem]}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        icon={() => <Icon name="logout" size={23} color={colors.black} />}
        label="Logout"
        onPress={() => {
          console.log('Logout');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#4da6ff',
    height: '20%',
    paddingBottom: 8,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginLeft: 6,
  },
  listItem: {
    marginTop: 10,
    flex: 1,
  },
  text1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'left',
    marginLeft: 6,
  },
  text2: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'left',
    marginLeft: 6,
  },
  text3: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginRight: 6,
  },
});

export default CustomDrawer;
