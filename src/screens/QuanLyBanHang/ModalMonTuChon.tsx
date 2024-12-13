import {View, Text, StyleSheet} from 'react-native';
import React, {useId, useRef, useState} from 'react';
import ModalComponent from '../QuanLyThucDon/Hoa/components/ModalComponent';
import TextComponent from '../QuanLyThucDon/Hoa/components/TextComponent';
import RowComponent from '../QuanLyThucDon/Hoa/components/RowComponent';
import {colors} from '../QuanLyThucDon/Hoa/contants/hoaColors';
import InputComponent from '../QuanLyThucDon/Hoa/components/InputComponent';
import SpaceComponent from '../QuanLyThucDon/Hoa/components/SpaceComponent';
import ButtonComponent from '../QuanLyThucDon/Hoa/components/ButtonComponent';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSendData: (data: any) => void;
}

const ModalMonTuChon = (props: Props) => {
  const {visible, onClose, onSendData} = props;

  const [tenMonTuChon, setTenMonTuChon] = useState('');
  const [giaMonTuChon, setGiaMonTuChon] = useState('');
  const [soLuongMonTuChon, setSoLuongMonTuChon] = useState('');
  const [ghiChuMonTuChon, setGhiChuMonTuChon] = useState('');

  const handleSendData = () => {
    const dataSend = {
      tenMon: tenMonTuChon,
      giaTien: parseInt(giaMonTuChon) * parseInt(soLuongMonTuChon),
      giaMonAn: parseInt(giaMonTuChon),
      soLuongMon: parseInt(soLuongMonTuChon),
      ghiChu: ghiChuMonTuChon,
    };
    onSendData(dataSend);
    onClose();
  };

  return (
    <ModalComponent
      visible={visible}
      borderRadius={2}
      title="Thêm món tự chọn"
      onClose={onClose}>
      <RowComponent styles={{width: '100%'}}>
        <View style={styles.inputLeft}>
          <TextComponent
            text="Tên món"
            size={15}
            fontWeight="600"
            color={colors.desc}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputComponent
            type={'normal'}
            placeholder={`VD: Món ăn 001`}
            value={tenMonTuChon}
            onChangeText={text => setTenMonTuChon(text)}
            styles={styles.input}
            fontSize={15}
          />
        </View>
      </RowComponent>
      <SpaceComponent height={10} />
      <RowComponent justify="space-between">
        <RowComponent styles={{flex: 1}}>
          <View style={styles.inputLeft}>
            <TextComponent
              text="Giá"
              size={15}
              fontWeight="600"
              color={colors.desc}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputComponent
              type={'normal'}
              placeholder={`VD: 100.000`}
              value={giaMonTuChon.toString()}
              onChangeText={text => setGiaMonTuChon(text)}
              styles={styles.input}
              fontSize={15}
              keyboardType="numeric"
            />
          </View>
        </RowComponent>
        <SpaceComponent width={10} />
        <RowComponent styles={{width: '30%'}}>
          <View
            style={[
              styles.inputLeft,
              {
                width: '40%',
              },
            ]}>
            <TextComponent
              text="SL"
              size={15}
              fontWeight="600"
              color={colors.black}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputComponent
              type={'normal'}
              placeholder={`VD: 1`}
              value={soLuongMonTuChon.toString()}
              onChangeText={text => setSoLuongMonTuChon(text)}
              styles={styles.input}
              fontSize={15}
              keyboardType="numeric"
            />
          </View>
        </RowComponent>
      </RowComponent>
      <SpaceComponent height={10} />
      <InputComponent
        value={ghiChuMonTuChon}
        onChangeText={text => setGhiChuMonTuChon(text)}
        placeholder="Ghi chú"
        styles={[styles.input2, {padding: 10}]}
        numberOfLines={5}
        type="normal"
        multiline={true}
      />
      <RowComponent justify="space-between" styles={{paddingHorizontal: 5}}>
        <ButtonComponent
          title="Đóng"
          onPress={onClose}
          styles={styles.button}
          titleSize={15}
          bgrColor={colors.desc2}
          titleFontWeight="600"
        />
        <ButtonComponent
          title="Thêm món"
          onPress={handleSendData}
          styles={styles.button}
          titleSize={15}
          bgrColor={'#FEF3EF'}
          titleColor={colors.orange}
          titleFontWeight="600"
        />
      </RowComponent>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  inputLeft: {
    width: '30%',
    borderWidth: 1 * 1.5,
    borderTopStartRadius: 5,
    borderBottomLeftRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.desc,
  },
  inputContainer: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 1 * 1.5,
    borderTopWidth: 1 * 1.5,
    borderBottomWidth: 1 * 1.5,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderColor: colors.desc,
    backgroundColor: colors.white,
  },
  input: {
    paddingVertical: 0,
    height: 37,
  },
  input2: {
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.desc2,
    textAlignVertical: 'top',
    marginTop: 5,
    marginBottom: 10,
    height: undefined,
    minHeight: 100,
    //width: '90%',
  },
  button: {
    width: '40%',
    height: 35,
  },
});

export default ModalMonTuChon;
