import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ModalComponent from '../components/ModalComponent';
import DatePicker from 'react-native-date-picker';
import RowComponent from '../components/RowComponent';
import ButtonComponent from '../components/ButtonComponent';
import {colors} from '../contants/hoaColors';

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onConfirm: () => void;
}

const ModalDate = (props: Props) => {
  const {visible, onClose, selectedDate, setSelectedDate, onConfirm} = props;
  return (
    <ModalComponent visible={visible} title="Chọn ngày" onClose={onClose}>
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
          onPress={onClose}
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

export default ModalDate;
