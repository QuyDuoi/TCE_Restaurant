import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextComponent from '../components/TextComponent';
import ModalComponent from '../components/ModalComponent';
import RowComponent from '../components/RowComponent';
import InputComponent from '../components/InputComponent';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import ButtonComponent from '../components/ButtonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDate from './ModalDate';

interface Props {
  visible: boolean;
  onClose: () => void;
  setFromDateParent: (date: Date) => void;
  setToDateParent: (date: Date) => void;
}

const ModalSelectDate = (props: Props) => {
  const {visible, onClose, setFromDateParent, setToDateParent} = props;
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [visibleModalDate, setVisibleModalDate] = useState(false);
  const [typeModalDate, setTypeModalDate] = useState<'from' | 'to'>('from');

  const handleConfirm = () => {
    setFromDateParent(fromDate);
    setToDateParent(toDate);
    onClose();
  };

  const handleOpenModalDate = (type: 'from' | 'to') => {
    setVisibleModalDate(true);
    setTypeModalDate(type);
  };

  const handleCloseModalDate = () => {
    setVisibleModalDate(false);
  };

  return (
    <>
      <ModalComponent
        visible={visible}
        onClose={onClose}
        title="Chọn khoảng thời gian"
        stylesTitle={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        <SpaceComponent height={10} />
        <View style={{alignItems: 'flex-start'}}>
          <RowComponent styles={{alignItems: 'center'}}>
            <TextComponent text="Từ ngày: " size={16} color={colors.black} />
            <InputComponent
              value={fromDate.toLocaleDateString('vi-VN')}
              onChangeText={() => {}}
              placeholder="Chọn ngày"
              styles={{
                height: 40,
                marginLeft: 14,
                //marginRight: 10,
                backgroundColor: colors.desc2,
                width: '67%',
                justifyContent: 'center',
                borderRadius: 5,
              }}
              type={'normal'}
              readonly
              flex={1}
              rightIcon={
                <Icon
                  name="calendar"
                  size={18}
                  color={colors.desc}
                  style={{
                    marginRight: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />
              }
              onPress={() => handleOpenModalDate('from')}
            />
          </RowComponent>
          <SpaceComponent height={15} />
          <RowComponent styles={{alignItems: 'center'}}>
            <TextComponent text="Đến ngày: " size={16} color={colors.black} />
            <InputComponent
              value={toDate.toLocaleDateString('vi-VN')}
              onChangeText={() => {}}
              placeholder="Chọn ngày"
              styles={{
                height: 40,
                marginRight: 10,
                marginLeft: 5,
                justifyContent: 'center',
                backgroundColor: colors.desc2,
                width: '70%',
                borderRadius: 5,
              }}
              type={'normal'}
              readonly
              flex={1}
              rightIcon={
                <Icon
                  name="calendar"
                  size={18}
                  color={colors.desc}
                  style={{
                    marginRight: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />
              }
              onPress={() => handleOpenModalDate('to')}
            />
          </RowComponent>
        </View>
        <SpaceComponent height={20} />
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
            onPress={handleConfirm}
            bgrColor={colors.blue2}
            styles={[styles.button]}
            titleColor={colors.white}
            boderRadius={5}
          />
        </RowComponent>
      </ModalComponent>
      <ModalDate
        visible={visibleModalDate}
        onCloseChild={() => {
          handleCloseModalDate();
        }}
        selectedDate={typeModalDate === 'from' ? fromDate : toDate}
        setSelectedDate={typeModalDate === 'from' ? setFromDate : setToDate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '35%',
    paddingVertical: 8,
    marginVertical: 5,
  },
});

export default ModalSelectDate;
