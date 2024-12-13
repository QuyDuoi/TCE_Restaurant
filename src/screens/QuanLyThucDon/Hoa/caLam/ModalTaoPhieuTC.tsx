import {View, Text, StyleSheet, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import ModalComponent from '../components/ModalComponent';
import TextComponent from '../components/TextComponent';
import RowComponent from '../components/RowComponent';
import InputComponent from '../components/InputComponent';
import {colors} from '../contants/hoaColors';
import SpaceComponent from '../components/SpaceComponent';
import RadioButtonComponent from '../components/RadioButtonComponent';
import ButtonComponent from '../components/ButtonComponent';

interface Props {
  visible: boolean;
  onClose: () => void;
  caLam: any;
}

const ModalTaoPhieuTC = (props: Props) => {
  const {visible, onClose, caLam} = props;
  const [selectedOption, setSelectedOption] = useState('Phiếu thu');
  const options = ['Phiếu thu', 'Phiếu chi'];
  const [soTien, setSoTien] = useState('');
  const [ghiChu, setGhiChu] = useState('');

  const handleConfirm = () => {
    const dataPhieu = {
      loaiPhieu: selectedOption,
      soTien: parseInt(soTien),
      ghiChu: ghiChu,
      id_caLam: caLam._id,
    };
    //CALL API
    console.log(dataPhieu);
  };

  return (
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Tạo phiếu thu chi"
      borderRadius={3}
      stylesTitle={{}}>
      <SpaceComponent height={10} />
      <RowComponent styles={{width: '100%'}}>
        <View style={styles.inputLeft}>
          <TextComponent
            text="Số tiền"
            size={15}
            fontWeight="600"
            color={colors.desc}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputComponent
            type={'normal'}
            placeholder={`VD: 100000`}
            value={soTien}
            onChangeText={text => setSoTien(text)}
            styles={styles.input}
            fontSize={15}
            keyboardType="numeric"
          />
        </View>
      </RowComponent>
      <SpaceComponent height={10} />
      <RowComponent styles={{marginLeft: 5}}>
        <TextComponent
          text="Loại: "
          size={17}
          fontWeight="700"
          color={colors.black}
        />
        <SpaceComponent width={10} />
        <RadioButtonComponent
          options={options}
          selectedOption={selectedOption}
          onSelect={option => setSelectedOption(option)}
          flexDirection="row"
          color={colors.blue2}
        />
      </RowComponent>
      <SpaceComponent height={10} />
      <InputComponent
        value={ghiChu}
        onChangeText={text => setGhiChu(text)}
        placeholder="Ghi chú"
        styles={[styles.input2]}
        numberOfLines={5}
        type="normal"
        multiline={true}
      />
      <SpaceComponent height={10} />
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
          title="Xác nhận"
          onPress={() => {
            if (soTien !== '') {
              handleConfirm();
              onClose();
              setSoTien('');
              setGhiChu('');
            } else {
              ToastAndroid.show('Tiền', ToastAndroid.SHORT);
            }
          }}
          styles={styles.button}
          titleSize={15}
          bgrColor={
            selectedOption === 'Phiếu thu'
              ? 'rgba(222, 247, 232, 1)'
              : '#f8d7da'
          }
          titleColor={
            selectedOption === 'Phiếu thu' ? 'rgba(60, 138, 86, 1)' : colors.red
          }
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
  },
  button: {
    width: '40%',
    height: 35,
  },
});

export default ModalTaoPhieuTC;
