import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import SectionComponent from '../../QuanLyThucDon/Hoa/components/SectionComponent';
import ButtonComponent from '../../QuanLyThucDon/Hoa/components/ButtonComponent';
import TitleComponent from '../../QuanLyThucDon/Hoa/components/TitleComponent';
import SpaceComponent from '../../QuanLyThucDon/Hoa/components/SpaceComponent';
import {colors} from '../../QuanLyThucDon/Hoa/contants/hoaColors';
import DatBanModal from './DatBanModal'; // Import modal đặt bàn
import ModalComponent from '../../QuanLyThucDon/Hoa/components/ModalComponent';
import {Ban} from '../../../store/BanSlice';
import {KhuVuc} from '../../../store/KhuVucSlice';
import TableBookingDetail from '../../../customcomponent/ItemChiTietDatBan';
import BookingFlow from '../../../customcomponent/BookingFlow';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onCloseParent: () => void;
  selectedBan: any;
}

const ModalChucNang = (props: Props) => {
  const {isVisible, onClose, onCloseParent, selectedBan} = props;
  const [isVisibleDatBan, setIsVisibleDatBan] = useState(false);
  const [isVisibleChiTietBan, setIsVisibleChiTietBan] = useState(false);

  //console.log(selectedBan?._id);
  const bans = useSelector((state: RootState) => state.ban.bans);

  return (
    <>
      <ModalComponent
        visible={isVisible}
        onClose={onClose}
        title="Lựa chọn chức năng">
        <View>
          <SectionComponent>
            <ButtonComponent
              title="Đặt bàn"
              onPress={() => {
                if (selectedBan && selectedBan.trangThai === 'Trống') {
                  setIsVisibleDatBan(true);
                } else if (selectedBan && selectedBan.trangThai === 'Đã đặt') {
                  ToastAndroid.show('Bàn đã được đặt', ToastAndroid.LONG);
                  onClose();
                } else if (
                  selectedBan &&
                  selectedBan.trangThai === 'Đang sử dụng'
                ) {
                  ToastAndroid.show('Bàn đang được sử dụng', ToastAndroid.LONG);
                  onClose();
                }
              }}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              title="Tạo hóa đơn"
              onPress={() => {}}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              title="Xem thông tin hóa đơn"
              onPress={() => {}}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              title="Xem thông tin bàn đặt"
              onPress={() => {
                setIsVisibleChiTietBan(true);
              }}
              bgrColor={colors.orange}
              titleColor={colors.white}
              styles={styles.button}
              boderRadius={100}
            />
          </SectionComponent>
          <SpaceComponent height={24} />
          <SectionComponent>
            <ButtonComponent
              title="Quay lại"
              onPress={onClose}
              bgrColor={colors.white}
              titleColor={colors.black}
              boederWidth={2}
              borderColor={colors.black}
              styles={styles.buttonClose}
              boderRadius={100}
            />
          </SectionComponent>
        </View>
      </ModalComponent>
      <DatBanModal
        isVisible={isVisibleDatBan}
        onClose={() => setIsVisibleDatBan(false)}
        selectedBan={selectedBan}
        onCloseParent={onCloseParent}
      />
      <TableBookingDetail
        slectedBan={selectedBan}
        visible={isVisibleChiTietBan}
        onClose={() => setIsVisibleChiTietBan(false)}
        //onEdit={() => setIsVisibleChiTietBan(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
  },
  buttonClose: {
    height: 45,
    marginBottom: 3,
  },
});

export default ModalChucNang;
