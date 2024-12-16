import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Ban} from '../store/Slices/BanSlice';
import RowComponent from '../screens/QuanLyThucDon/Hoa/components/RowComponent';
import TextComponent from '../screens/QuanLyThucDon/Hoa/components/TextComponent';
import {colors} from '../screens/QuanLyThucDon/Hoa/contants/hoaColors';
import SpaceComponent from '../screens/QuanLyThucDon/Hoa/components/SpaceComponent';

interface Props {
  slectedBan?: any;
  visible: boolean;
  onClose: () => void;
  onEdit?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const TableBookingDetail = (props: Props) => {
  const {visible, onClose, onEdit, styles, slectedBan} = props;
  if (!slectedBan) {
    return null; // Kiểm tra nếu dữ liệu không tồn tại
  }

  const thongTinBanDat = slectedBan?.ghiChu?.split(' - ');

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={[stylesContainer.container, styles]}>
        <View style={stylesContainer.modal}>
          <View style={[{alignItems: 'center'}]}>
            <Text style={stylesContainer.title}>Chi tiết đặt bàn</Text>
            <Text style={stylesContainer.subTitle}>{`${
              slectedBan.tenBan.length === 1 ? 'Bàn ' : ''
            }${slectedBan.tenBan} | ${slectedBan.kv.tenKhuVuc || 'N/A'}`}</Text>
          </View>
          <SpaceComponent height={14} />
          <RowComponent>
            <TextComponent
              text="Họ tên: "
              styles={[{}]}
              fontWeight="700"
              color={colors.black}
              size={16}
            />
            <TextComponent
              text={
                thongTinBanDat && thongTinBanDat[3] ? thongTinBanDat[3] : 'N/A'
              }
              styles={stylesContainer.subTitle}
            />
          </RowComponent>
          <SpaceComponent height={6} />
          <RowComponent>
            <TextComponent
              text="Ngày đặt: "
              styles={[{}]}
              fontWeight="700"
              color={colors.black}
              size={16}
            />
            <TextComponent
              text={
                thongTinBanDat && thongTinBanDat[1] && thongTinBanDat[2]
                  ? thongTinBanDat[2] + ' - ' + thongTinBanDat[1]
                  : 'N/A'
              }
              styles={stylesContainer.subTitle}
            />
          </RowComponent>
          <SpaceComponent height={6} />
          <RowComponent styles={{}}>
            <TextComponent
              text="Ghi chú: "
              fontWeight="700"
              color={colors.black}
              size={16}
            />
            <View style={{width: '100%'}}>
              <TextComponent
                text={
                  thongTinBanDat && thongTinBanDat[0]
                    ? thongTinBanDat[0]
                    : thongTinBanDat[0] === ''
                    ? 'Không có'
                    : slectedBan?.ghiChu
                }
                styles={{
                  width: '80%',
                  justifyContent: 'center',
                }}
                color={colors.black}
                size={15}
              />
            </View>
          </RowComponent>
          <SpaceComponent height={10} />
          <View style={stylesContainer.buttonContainer}>
            <TouchableOpacity
              style={stylesContainer.closeButton}
              onPress={onClose}>
              <Text style={stylesContainer.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'green',
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
  },
  note: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    height: 45,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '40%',
  },
  confirmButton: {
    flex: 1,
    height: 40,
    padding: 10,
    backgroundColor: '#ffede7',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#ff6b35',
    fontWeight: '500',
  },
});

export default TableBookingDetail;
