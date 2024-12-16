import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import CardComponent from '../QuanLyThucDon/Hoa/components/CardComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import CheckBox from 'react-native-check-box';

const {width, height} = Dimensions.get('window');

interface Props {
  tenMon: string;
  trangThai: boolean;
  soLuong: number;
  ban: any;
  khuVuc: any;
  onClick: () => void;
  anhMonAn: string;
  ghiChu: string;
}

const ItemChiTietHoaDon = (props: Props) => {
  const {tenMon, trangThai, anhMonAn, soLuong, onClick, ban, khuVuc, ghiChu} = props;

  return (
    <CardComponent
      styles={{
        margin: 4,
      }}
      evlation={3}>
      <RowComponent
        // onPress={onPress}
        justify="space-between"
        styles={{
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={styles.item}>
          <View style={{margin: 4}}>
            <TextComponent
              text={tenMon}
              color={colors.black}
              size={22}
              fontWeight="bold"
            />
            <Text style={styles.text}>
              Khu vực: {khuVuc} | Bàn: {ban}
            </Text>
          </View>
          <RowComponent
            styles={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              width: '100%',
            }}>
            <Image
              source={{uri: anhMonAn}}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
              }}
            />
            <View style={styles.orderInfo}>
              <View style={styles.box}>
                <TextComponent
                  text={'Số lượng: ' + soLuong}
                  color={colors.black}
                  size={16}
                />
                <View style={styles.statusContainer}>
                  <CheckBox
                    isChecked={trangThai}
                    onClick={onClick}
                    checkedCheckBoxColor="#33cc33"
                    uncheckedCheckBoxColor="#ff4d4d"
                  />
                  <TextComponent
                    text={trangThai ? 'Đã lên' : 'Chưa xong'}
                    fontWeight="bold"
                    color={trangThai ? colors.status : colors.status2}
                    styles={{
                      marginHorizontal: 4,
                    }}
                  />
                </View>
              </View>
              <TextComponent
                text={`Ghi chú: ${ghiChu == undefined ? "Không có" : ghiChu}`}
                color="black"
                numberOfLines={2}
              />
            </View>
          </RowComponent>
        </View>
      </RowComponent>
    </CardComponent>
  );
};

export default ItemChiTietHoaDon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: width * 0.04,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#ff7f50',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  searchInput: {
    height: height * 0.07,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  scrollView: {
    paddingBottom: height * 0.02,
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderRadius: 8,
    marginBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pending: {
    backgroundColor: '#ffe6e6',
  },
  completed: {
    backgroundColor: '#ccffcc',
  },
  foodImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 8,
    marginRight: width * 0.03,
  },
  orderInfo: {
    width: '80%',
    paddingHorizontal: 8
  },
  foodName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: width * 0.035,
    color: '#ff7f50',
    marginTop: 4,
  },
  areaText: {
    fontSize: width * 0.03,
    color: '#333',
  },
  detailLink: {
    color: '#4da6ff',
    textDecorationLine: 'underline',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextPending: {
    color: '#ff4d4d',
    fontSize: width * 0.03,
    marginLeft: 5,
  },
  statusTextCompleted: {
    color: '#33cc33',
    fontSize: width * 0.03,
    marginRight: 10,
    marginLeft: 20,
  },
  item: {
    flexDirection: 'column',
    width: '100%',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 14
  }
});
