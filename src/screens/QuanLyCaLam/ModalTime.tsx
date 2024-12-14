import {View, StyleSheet} from 'react-native';
import React from 'react';
import ModalComponent from '../QuanLyThucDon/Hoa/components/ModalComponent';
import DatePicker from 'react-native-date-picker';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedTime: Date;
  setSelectedTime: (time: Date) => void;
  onConfirm: () => void;
}

const ModalTime = (props: Props) => {
  const {visible, onClose, selectedTime, setSelectedTime, onConfirm} = props;
  return (
    <ModalComponent visible={visible} title="Chọn giờ" onClose={onClose}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <DatePicker
          mode="time"
          date={selectedTime}
          onDateChange={val => setSelectedTime(val)}
          locale="vi"
        />
      </View>
      <RowComponent
        justify="space-between"
        styles={{
          marginHorizontal: 10,
        }}>
        <ButtonComponent
          title="Hủy"
          onPress={() => {
            onClose();
          }}
          bgrColor={colors.blue2}
          styles={[styles.button]}
          titleColor={colors.white}
          boderRadius={5}
        />
        <ButtonComponent
          title="Xác nhận"
          onPress={() => {
            onConfirm();
            onClose();
          }}
          bgrColor={colors.blue2}
          styles={[styles.button]}
          titleColor={colors.white}
          boderRadius={5}
        />
      </RowComponent>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '40%',
    paddingVertical: 8,
    marginVertical: 5,
  },
});

export default ModalTime;
