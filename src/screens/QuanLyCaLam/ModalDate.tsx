import {View, StyleSheet} from 'react-native';
import React from 'react';
import ModalComponent from '../QuanLyThucDon/Hoa/components/ModalComponent';
import DatePicker from 'react-native-date-picker';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';

interface Props {
  visible: boolean;
  onCloseChild: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onConfirm?: () => void;
}

const ModalDate = (props: Props) => {
  const {visible, onCloseChild, selectedDate, setSelectedDate, onConfirm} =
    props;
  return (
    <ModalComponent visible={visible} title="Chọn ngày" onClose={onCloseChild}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <DatePicker
          mode="date"
          date={selectedDate}
          onDateChange={val => setSelectedDate(val)}
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
            onCloseChild();
          }}
          bgrColor={colors.blue2}
          styles={[styles.button]}
          titleColor={colors.white}
          boderRadius={5}
        />
        <ButtonComponent
          title="Xác nhận"
          onPress={() => {
            setSelectedDate(selectedDate);
            onCloseChild();
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

export default ModalDate;
